import {MovieEntity} from "../entites/MovieEntity";
import {MovieRepository} from "../repositories/MovieRepository";
import axios from "axios";
import {GenreService} from "../../genre/GenreServices";
import {ProviderService} from "../../provider/service/providerService";
import {MovieType} from "../type/movieType";


export class MovieServices {
    private readonly movieRepository: MovieRepository;
    private readonly genreService: GenreService;
    private readonly providerService: ProviderService;

    constructor() {
        this.movieRepository = new MovieRepository();
        this.genreService = new GenreService();
        this.providerService = new ProviderService();
    }

    async saveMovies(genre: number[], adult: boolean, providers: number[]): Promise<MovieEntity[]> {
        const movieData = await this.fetchMoviesFromTMDB(genre, adult, providers);
        const movieList = movieData.map((movie: any) => this.createMovieEntity(movie));
        return  Promise.all(movieList.map((movie: MovieEntity) => this.movieRepository.saveMovie(movie)));
    }

    private createMovieEntity(movieData: MovieEntity): MovieEntity {
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
        return movie;
    }

//todo géer les erreurs
    async fetchMoviesFromTMDB(genre: number[], adult: boolean, providers: number[]): Promise<MovieEntity[]> {
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
        return  this.transformTMDBDataToEntities(movieData);

    }

    private async transformTMDBDataToEntities(movieData: any): Promise<MovieEntity[]> {
        const movieList = await Promise.all(movieData.map(async (movie: any) => ({
            adult: movie.adult,
            genres: await Promise.all(movie.genre_ids.map((genreId: number) => this.genreService.getGenreById(genreId))),
            id: movie.id,
            synopsis: movie.overview,
            imagePath: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            releaseDate: movie.release_date,
            title: movie.title,
            averageGrade: movie.vote_average,
            votes: movie.vote_count,
            duration: await this.fetchMovieDuration(movie.id),
            providers: await this.providerService.getProviderForMovieId(movie.id)
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