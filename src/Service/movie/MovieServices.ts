import {MovieEntity} from "../../entity/MovieEntity";
import {MovieRepository} from "../../repository/movie/MovieRepository";
import axios from "axios";
import {GenreService} from "../genre/GenreServices";
import {ProviderService} from "../provider/providerService";
import {UserService} from "../user/userService";
import {PreferenceService} from "../preference/PreferenceService";
import {SwipeRepository} from "../../repository/swipe/SwipeRepository";
import {MovieType, UserPayloadType} from "../../type/Type";
import {GroupService} from "../group/groupService";

export class MovieServices {
    private readonly movieRepository: MovieRepository;
    private readonly genreService: GenreService;
    private readonly providerService: ProviderService;
    private readonly userService: UserService;
    private readonly preferenceService: PreferenceService;
    private readonly swipeService: SwipeRepository;
    private readonly groupService: GroupService;

    constructor() {
        this.movieRepository = new MovieRepository();
        this.genreService = new GenreService();
        this.providerService = new ProviderService();
        this.userService = new UserService();
        this.preferenceService = new PreferenceService();
        this.swipeService = new SwipeRepository();
        this.groupService = new GroupService();
    }

    async saveNewMoviesFromTMDB(genre: number[], adult: boolean, providers: number[], page = 1): Promise<MovieEntity[]> {

        const movieData = await this.fetchMoviesFromTMDB(genre, adult, providers, page);
        const movieList = movieData.map((movie: MovieType) => this.createMovieEntity(movie));
        const existingIds = await this.movieRepository.checkExistingMovies(movieList);
        const newMovies = movieList.filter(movie => !existingIds.includes(movie.id));
        if (newMovies.length > 0) return await Promise.all(newMovies.map((movie: MovieEntity) => this.movieRepository.saveMovie(movie)));
        page++;
        return await this.saveNewMoviesFromTMDB(genre, adult, providers, page);
    }
     isStringValid(input: string): boolean {
        const validCharactersRegex = /^[a-zA-Z0-9\s.,!?'"()\-:;]+$/;
        return validCharactersRegex.test(input);
    }
    private cleanString(input: string): string {
        const text =  input.replace(/[\u200B-\u200D\uFEFF]/g, '');
        if(this.isStringValid(text)) return text;
        else return 'No synopsis available';
    }


    private createMovieEntity(movieData: MovieType): MovieEntity {
        const movie = new MovieEntity();
        movie.adult = movieData.adult;
        movie.genres = movieData.genres;
        movie.id = movieData.id;
        movie.title = movieData.title;
        movie.synopsis = this.cleanString(movieData.synopsis);
        movie.releaseDate = movieData.releaseDate;
        movie.averageGrade = movieData.averageGrade;
        movie.votes = movieData.votes;
        movie.duration = movieData.duration;
        movie.imagePath = movieData.imagePath;
        movie.providers = movieData.providers;
        return movie;
    }

    async fetchMoviesFromTMDB(genre: number[], adult: boolean, providers: number[], page: number): Promise<MovieType[]> {
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

        return this.transformTMDBDataToEntities(movieData);

    }

    private async transformTMDBDataToEntities(moviesData: any): Promise<MovieType[]> {
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
    }

    async fetchMovieDuration(id: number): Promise<number> {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        return res.data.runtime;
    }

    async getMovies(userPayload: UserPayloadType, additionalExcluded: number[] = []): Promise<MovieEntity[]> {
        const user = await this.userService.findByEmail(userPayload.email);
        const genres = await this.preferenceService.getGenrePreference(user);
        const providers = await this.preferenceService.getProviderPreference(user);
        let excludeIds = await this.swipeService.getExcludedMovies(user);
        excludeIds = excludeIds.concat(additionalExcluded);
        const movies = await this.movieRepository.getMovie(genres, providers, excludeIds, 20);
        if (movies.length >= 10) {
            return movies;
        } else {
            await this.saveNewMoviesFromTMDB(
                genres.map((genre) => genre.id),
                user.age! > 18,
                providers.map((provider) => provider.id)
            );
            return await this.getMovies(userPayload, additionalExcluded);
        }
    }


    async getMovieById(movieId: number): Promise<MovieEntity | null> {
        return await this.movieRepository.getMovieById(movieId);
    }

    async getMovieForGroup(users: number[], userPayload: UserPayloadType, groupId: string, excludesIds: number[]): Promise<MovieEntity[]> {
        const user = await this.userService.findByEmail(userPayload.email);
        const userPreference = await this.preferenceService.getGenrePreference(user);
        const excludeIds = await this.swipeService.getExcludedMovies(user);
        const excludeIdsForGroup = excludeIds.concat(excludesIds);
        console.log('Exclude Ids:', excludeIdsForGroup);
        const swipedUserMovie = await this.swipeService.getSwipeMovie(user);
        const groupGenrePreference = await this.groupService.getGroupGenrePreference(groupId);
        const groupProviderPreference = await this.groupService.getGroupProviderPreference(groupId);

        // Récupérer les films aimés par les utilisateurs
        const moviesLiked: MovieEntity[] = (await Promise.all(
            users.map((user) => this.swipeService.getMovieLiked(user))
        )).flat();

        // Supprimer les doublons basés sur l'id
        const uniqueMoviesLiked = moviesLiked.filter(
            (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
        );
        console.log('Unique Movies Liked:', uniqueMoviesLiked);
        // Exclure les films déjà "swipés" par l'utilisateur
        const movieFilteredNotHistory = uniqueMoviesLiked.filter(
            (movie) => !swipedUserMovie.some((swipedMovie) => swipedMovie.id === movie.id)
        );
console.log('Movies filtered:', movieFilteredNotHistory);
        // Filtrer les films selon les préférences de l'utilisateur

        let movieFiltered = movieFilteredNotHistory.filter((movie) => {
            return movie.genres.some((genre) => {
                console.log('Genre ID:',genre, genre.id); // Ajoute un log pour chaque genre
                return userPreference.some((preference) => preference.id === genre.id);
            });
        });


        // Compléter les films si moins de 20
        if (movieFiltered.length < 20) {
            const additionalMovies = await this.movieRepository.getMovie(
                groupGenrePreference,
                groupProviderPreference,
                excludeIdsForGroup,
                20 - movieFiltered.length
            );

            // Ajouter les films supplémentaires et supprimer les doublons
            movieFiltered = [...movieFiltered, ...additionalMovies].filter(
                (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
            );
        }

        // Compléter avec des films depuis TMDB si toujours insuffisant
        if (movieFiltered.length < 20) {
            await this.saveNewMoviesFromTMDB(
                groupGenrePreference.map((genre) => genre.id),
                user.age! > 18,
                groupProviderPreference.map((provider) => provider.id)
            );

            const newlyAddedMovies = await this.movieRepository.getMovie(
                groupGenrePreference,
                groupProviderPreference,
                excludeIdsForGroup,
                20 - movieFiltered.length
            );

            movieFiltered = [...movieFiltered, ...newlyAddedMovies].filter(
                (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
            );
        }

        return movieFiltered
    }
    async getSelectionMovieGroup(users: number[]) {
        const moviesLiked: MovieEntity[] = (await Promise.all(
            users.map((user) => this.swipeService.getMovieLiked(user))
        )).flat();

        const movieCountMap = new Map<number, { movie: MovieEntity; count: number }>();
        moviesLiked.forEach((movie) => {
            if (movieCountMap.has(movie.id)) {
                movieCountMap.get(movie.id)!.count++;
            } else {
                movieCountMap.set(movie.id, { movie, count: 1 });
            }
        });

        const filteredMovies = Array.from(movieCountMap.values()).filter(
            (entry) => entry.count >= 2
        );
        return filteredMovies;
    }
}