import {GenreEntity} from "../movie/entites/GenreEntity";
import {GenreRepository} from "./GenreRepository";
import axios from "axios";

export class GenreService {
    private genreRepository: GenreRepository;

    constructor() {
        this.genreRepository = new GenreRepository();
    }

    async getGenreById(id: number): Promise<GenreEntity | null> {
        return await this.genreRepository.findById(id);
    }

    async getGenresByTMDB() {
        const BaseUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=FR';
        const response = await axios.get(`${BaseUrl}`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        return response.data.genres;
    }

    async saveGenres(): Promise<GenreEntity[]> {
        const genres = await this.getGenresByTMDB();
        const genreList = genres.map((genre: any) => this.createGenre(genre));
        return Promise.all(genreList.map((genre: GenreEntity) => this.genreRepository.saveGenre(genre)));
    }

    private createGenre(genreData: any): GenreEntity {
        const genre = new GenreEntity();
        genre.id = genreData.id;
        genre.name = genreData.name;
        genre.imagePath = 'default.jpg';
        return genre;
    }
}
