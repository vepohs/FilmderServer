import {MovieEntity} from "../entites/MovieEntity";
import {MovieRepository} from "../repositories/MovieRepository";
import {Movie} from "../type/Movie";
import axios from "axios";
import {GenreService} from "../../genre/GenreServices";
import {ProviderService} from "../../authentification/Provider/service/providerService";


export class MovieServices {
    private readonly movieRepository: MovieRepository;
    private readonly genreService: GenreService;
    private readonly providerService: ProviderService;

    constructor() {
        this.movieRepository = new MovieRepository();
        this.genreService = new GenreService();
        this.providerService = new ProviderService();
    }

//TODO: voir si on garde ou pas cette fonction
    async addMovie(movieData: any): Promise<MovieEntity> {
        const movie = this.createMovie(movieData);
        return await this.movieRepository.saveMovie(movie);
    }

    private createMovie(movieData: Movie): MovieEntity {
        const movie = new MovieEntity();
        movie.title = movieData.getTitle();
        movie.releaseDate = movieData.getReleaseDate();
        movie.duration = movieData.getDuration();
        movie.synopsis = movieData.getSynopsis();
        movie.imagePath = movieData.getImagePath();
        return movie;
    }

    async getMoviesByTMDB(genre: number[], adult: boolean, providers: number[]): Promise<Movie[]> {
        const responce = await axios.get(``, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        const movieData = responce.data.results;

        const movieList = await Promise.all(movieData.map(async (movie: any) => ({
            adult: movie.adult,
            genres: movie.genre_ids.map((genreId: number) => (this.genreService.getGenreById(genreId))),
            id: movie.id,
            synopsis: movie.overview,
            //TODO: voir la taille que l'on envoie
            imagePath: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            releaseDate: movie.release_date,
            title: movie.title,
            averageGrade: movie.vote_average,
            votes: movie.vote_count,
            duration: await this.getMovieDuration(movie.id),
            providerList: await this.providerService.getProvidersByFilmId(movie.id)
        })));
        return movieList;
    }

    async getMovieDuration(id: number): Promise<number> {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        return res.data.runtime;
    }
}