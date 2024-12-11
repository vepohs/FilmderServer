import {MovieEntity} from "../../entity/MovieEntity";
import {MovieRepository} from "../../repository/movie/MovieRepository";
import axios from "axios";
import {MovieType} from "../../type/Type";
import {GroupEntity} from "../../entity/GroupEntity";
import {
    createGenreService, createGroupService, createPreferenceService,
    createProviderService,
    createSwipeService,
} from "../../factories/ClassFactory";
import {EntityFactory} from "../../factories/EntityFactory";
import {UserEntity} from "../../entity/UserEntity";
import {
    FailedToFetchMovieDurationError,
    FailedToFetchMovieError, FailedToGetGroupMovieError,
    FailedToGetMovieError,
    FailedToSaveMovieError,
    FailedToTransformMovieData
} from "../../error/movieError";
import {MovieGroupEntity} from "../../entity/MovieGroupEntity";
import {SwipeMovieGroupService} from "../group/swipeMovieGroupService";


export class MovieServices {
    private readonly genreService = createGenreService();
    private readonly providerService = createProviderService();
    private readonly preferenceService = createPreferenceService()
    private readonly swipeService = createSwipeService()
    private readonly groupService = createGroupService();
    private readonly swipeMovieGroupService = new SwipeMovieGroupService();
    private readonly entityFactory = new EntityFactory();

    constructor(private readonly movieRepository: MovieRepository) {
    }

    getId = <T extends { id: number }>(item: T): number => item.id;
    createMovieEntity = (movie: MovieType): MovieEntity => this.entityFactory.createMovieEntity(movie);
    saveMovie = async (movie: MovieEntity): Promise<MovieEntity> => await this.movieRepository.saveMovie(movie);
    uniqueMovie = (movies: MovieEntity[]) => {
        return Array.from(new Map(movies.map(movie => [movie.id, movie])).values());
    };

//todo boucle inifini ou erreur tmdb
    async saveNewMoviesFromTMDB(
        genre: number[],
        adult: boolean,
        providers: number[],
        page = 1,
        previousMovies: MovieEntity[] = []
    ): Promise<MovieEntity[]> {
        try {
            let movies = [...previousMovies];

            while (movies.length < 20) {
                const fetchedMovies = await this.fetchMoviesFromTMDB(genre, adult, providers, page);
                const existingMovieIds = await this.movieRepository.checkExistingMovies(fetchedMovies);
                const newMovies = fetchedMovies.filter(movie => !existingMovieIds.includes(movie.id));
                movies = [...movies, ...newMovies];
                page++;
                if (movies.length >= 20) break;
            }
            await Promise.all(movies.map(this.saveMovie));
            return movies;
        } catch {
            throw new FailedToSaveMovieError();
        }
    }


    async fetchMoviesFromTMDB(genre: number[], adult: boolean, providers: number[], page: number): Promise<MovieEntity[]> {
        try {
            const BaseUrl = 'https://api.themoviedb.org/3/discover/movie';
            const response = await axios.get(`${BaseUrl}`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                },
                params: {
                    with_genres: genre.join('|'),
                    include_adult: adult,
                    include_video: false,
                    with_watch_providers: providers.join('|'),
                    watch_region: 'BE',
                    sort_by: 'popularity.desc',
                    page: page
                }
            });
            const movieData = response.data.results;
            const moviesType = await this.transformTMDBDataMovieType(movieData);
            const fetchedMovies = moviesType.map(this.createMovieEntity);
            return fetchedMovies;
        } catch {
            throw new FailedToFetchMovieError();
        }
    }

    private async transformTMDBDataMovieType(moviesData: any): Promise<MovieType[]> {
        try {
            const movieList = await Promise.all(moviesData.map(async (movieData: any) => ({
                adult: movieData.adult,
                genres: await this.genreService.getGenreForMovie(movieData),
                id: movieData.id,
                synopsis: movieData.overview,
                imagePath: 'https://image.tmdb.org/t/p/w500' + movieData.poster_path,
                releaseDate: movieData.release_date,
                title: movieData.title,
                averageGrade: movieData.vote_average,
                votes: movieData.vote_count,
                duration: await this.fetchMovieDuration(movieData.id),
                providers: await this.providerService.getProvidersForMovie(movieData)
            })));
            return movieList;
        } catch {
            throw new FailedToTransformMovieData();
        }
    }

    async fetchMovieDuration(id: number): Promise<number> {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                }
            });
            const duration = res.data.runtime;
            return duration;
        } catch {
            throw new FailedToFetchMovieDurationError();
        }
    }

    async getMovies(user: UserEntity, additionalExcluded: number[] = []): Promise<MovieEntity[]> {
        try {
            const genres = await this.preferenceService.getGenrePreference(user);
            const providers = await this.preferenceService.getProviderPreference(user);
            let excludeIds = (await this.swipeService.getExcludedMovies(user)).map(this.getId);
            excludeIds = excludeIds.concat(additionalExcluded);
            const movies = await this.movieRepository.getMovie(genres, providers, excludeIds, 20);
            if (movies.length >= 10) return movies;
            const genresIds = genres.map(this.getId);
            const isAdult = user.age > 18;
            const providerIds = providers.map(this.getId);
            await this.saveNewMoviesFromTMDB(genresIds, isAdult, providerIds);
            return await this.getMovies(user, additionalExcluded);
        } catch {
            throw new FailedToGetMovieError();
        }
    }


    async getMovieById(movieId: number): Promise<MovieEntity> {
        const movie = await this.movieRepository.getMovieById(movieId);
        if (!movie) throw new FailedToGetMovieError();
        return movie;
    }


    async getMovieForGroup(users: UserEntity[], user: UserEntity, group: GroupEntity, excludesIds: number[]): Promise<MovieEntity[]> {
        try {
            const userIds = users.map(this.getId);
            const userPreference = await this.preferenceService.getGenrePreference(user);
            const excludedSwipedMovieIds = (await this.swipeService.getExcludedMovies(user)).map(this.getId);
            const excludeIdsForGroup = excludedSwipedMovieIds.concat(excludesIds);
            const swipedUserMovie = await this.swipeService.getSwipeMovie(user);
            const groupGenrePreference = await this.groupService.getGroupGenrePreference(group);
            const groupProviderPreference = await this.groupService.getGroupProviderPreference(group);
            const moviesLiked: MovieEntity[] = await this.swipeService.getUsersMovieLiked(userIds);
            const uniqueMoviesLiked = this.uniqueMovie(moviesLiked);
            const movieFilteredNotHistory = uniqueMoviesLiked.filter(
                (movie) => !swipedUserMovie.some((swipedMovie: MovieEntity) => swipedMovie.id === movie.id));
            let movieFiltered = movieFilteredNotHistory.filter((movie) => {
                return movie.genres.some((genre) => {
                    return userPreference.some((preference) => preference.id === genre.id);
                });
            });
            movieFiltered = movieFiltered.slice(0, 20);

            if (movieFiltered.length < 20) {
                const additionalMovies = await this.movieRepository.getMovie(
                    groupGenrePreference,
                    groupProviderPreference,
                    excludeIdsForGroup,
                    20 - movieFiltered.length
                );
                movieFiltered = this.uniqueMovie([...movieFiltered, ...additionalMovies]);
            }

            if (movieFiltered.length < 20) {
                const genreIds = groupGenrePreference.map(this.getId);
                const isAdult = user.age > 18
                const providerIds = groupProviderPreference.map(this.getId);
                await this.saveNewMoviesFromTMDB(genreIds, isAdult, providerIds, 1, movieFiltered);

                const newlyAddedMovies = await this.movieRepository.getMovie(
                    groupGenrePreference,
                    groupProviderPreference,
                    excludeIdsForGroup,
                    20 - movieFiltered.length
                );
                movieFiltered = this.uniqueMovie([...movieFiltered, ...newlyAddedMovies]);
            }

            return movieFiltered
        } catch {
            throw new FailedToGetGroupMovieError();
        }
    }

    async getSelectionMovieGroup(userIds: number[], group: GroupEntity) {
        try {
            const moviesLiked: MovieEntity[] = await this.swipeService.getUsersMovieLiked(userIds);
            const movieSwipedGroup = await this.swipeMovieGroupService.getMovieGroup(group);
            const moviesNotInGroup = moviesLiked.filter((movie: MovieEntity) => !movieSwipedGroup.some((movieGroup: MovieGroupEntity) => movieGroup.movie.id === movie.id));
            const movieCountMap = new Map<number, { movie: MovieEntity; count: number }>();
            moviesNotInGroup.forEach((movie) => {
                if (movieCountMap.has(movie.id)) movieCountMap.get(movie.id)!.count++;
                else movieCountMap.set(movie.id, {movie, count: 1});

            });

            const filteredMovies = Array.from(movieCountMap.values()).filter(
                (entry) => entry.count >= 2
            );
            return filteredMovies;
        } catch {
            throw new FailedToGetGroupMovieError();
        }
    }
}