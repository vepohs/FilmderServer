import {MovieEntity} from "../entites/MovieEntity";
import {MovieRepository} from "../repositories/MovieRepository";
import axios from "axios";
import {MovieType} from "../type/movieType";
import {GenreService} from "../../genre/GenreServices";
import {ProviderService} from "../../provider/service/providerService";

export class MovieServices {
    private readonly movieRepository: MovieRepository;
    private readonly genreService: GenreService ;
    private readonly providerService: ProviderService;


    constructor() {
        this.movieRepository = new MovieRepository();
        this.genreService = new GenreService();
        this.providerService = new ProviderService();
    }

    async saveMovies(genre: number[], adult: boolean, providers: number[]): Promise<MovieEntity[]> {
        const movieData = await this.fetchMoviesFromTMDB(genre, adult, providers);
        const movieList = movieData.map((movie: MovieType) => this.createMovieEntity(movie));
        return Promise.all(movieList.map((movie: MovieEntity) => this.movieRepository.saveMovie(movie)));
    }

    private createMovieEntity(movieData: MovieType): MovieEntity {
        const movie = new MovieEntity();
        movie.adult = movieData.adult;
        movie.genres = movieData.genres;
        movie.id = movieData.id;
        movie.title = movieData.title;
        movie.synopsis = movieData.synopsis;
        movie.releaseDate = movieData.releaseDate;
        movie.averageGrade = movieData.averageGrade;
        movie.votes = movieData.votes;
        movie.duration = movieData.duration;
        movie.imagePath = movieData.imagePath;
        movie.providers = movieData.providers;
        console.log('providerrrrrrrr:', movie.providers);
        return movie;
    }

    async fetchMoviesFromTMDB(genre: number[], adult: boolean, providers: number[]): Promise<MovieType[]> {
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
                sort_by: 'popularity.desc'
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
}