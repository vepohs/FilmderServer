import {MovieEntity} from "../entites/MovieEntity";
import {MovieRepository} from "../repositories/MovieRepository";
import axios from "axios";
import {MovieType} from "../type/movieType";
import {GenreService} from "../../genre/GenreServices";
import {ProviderService} from "../../provider/service/providerService";
import {PayloadType} from "../../authentification/type/UserPayLoad";
import {UserService} from "../../user/services/userService";
import {PreferenceService} from "../../user/services/PreferenceService";
import {SwipeService} from "../../user/services/SwipeService";
import {SwipeRepository} from "../../user/repositories/SwipeRepository";


export class MovieServices {
    private readonly movieRepository: MovieRepository;
    private readonly genreService: GenreService;
    private readonly providerService: ProviderService;
    private readonly userService: UserService;
    private readonly preferenceService: PreferenceService;
    private readonly swipeService: SwipeRepository;

    constructor() {
        this.movieRepository = new MovieRepository();
        this.genreService = new GenreService();
        this.providerService = new ProviderService();
        this.userService = new UserService();
        this.preferenceService = new PreferenceService();
        this.swipeService = new SwipeRepository();
    }

    async saveNewMoviesFromTMDB(genre: number[], adult: boolean, providers: number[],page=1): Promise<MovieEntity[]> {

        const movieData = await this.fetchMoviesFromTMDB(genre, adult, providers, page);
        const movieList = movieData.map((movie: MovieType) => this.createMovieEntity(movie));
        const existingIds = await this.movieRepository.checkExistingMovies(movieList);
        const newMovies = movieList.filter(movie => !existingIds.includes(movie.id));
            if(newMovies.length> 0) return await Promise.all(newMovies.map((movie: MovieEntity) => this.movieRepository.saveMovie(movie)));
            page++;
            console.log('page',page)
           return  await this.saveNewMoviesFromTMDB(genre, adult, providers, page);
    }

     private cleanString(input: string): string {
        return input.replace(/[\u200B-\u200D\uFEFF]/g, '');
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

    async getMovies(userPayload: PayloadType): Promise<MovieEntity[]> {
        const user = await this.userService.findByEmail(userPayload.email);
        if (user) {
            const genres = await this.preferenceService.getGenrePreference(user);
            const providers = await this.preferenceService.getProviderPreference(user);
            const excludeIds = await this.swipeService.getExcludedMovies(user);
            const movies = await this.movieRepository.getMovie(genres, providers, excludeIds);
            if (movies.length >= 10) {
                return movies;
            } else {
                await this.saveNewMoviesFromTMDB(
                    genres.map((genre) => genre.id),
                    user.age! > 18,
                    providers.map((provider) => provider.id)
                );
                return await this.getMovies(userPayload);
            }
        }
        return [];
    }


    async getMovieById(movieId: number): Promise<MovieEntity | null> {
       return  await this.movieRepository.getMovieById(movieId);
    }
}