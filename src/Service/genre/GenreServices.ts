import {GenreEntity} from "../../entity/GenreEntity";
import {GenreRepository} from "../../repository/genre/GenreRepository";
import axios from "axios";
import {FailedToGetGenre, FailedToSaveGenreError} from "../../error/genreError";
import {EntityFactory} from "../../factories/EntityFactory";
import {createEntityFactory} from "../../factories/ClassFactory";

export class GenreService {
    private readonly factory: EntityFactory = createEntityFactory()

    constructor(private readonly genreRepository: GenreRepository) {}

    saveGenre = async (genre: GenreEntity) => this.genreRepository.saveGenre(genre);
    createGenre = (genre: any) => this.factory.createGenreEntity(genre);

    async getGenreById(id: number): Promise<GenreEntity> {
        const genreId = await this.genreRepository.findGenreByID(id);
        if (!genreId) throw new FailedToGetGenre();
        return genreId;
    }

    async getGenresByTMDB() {
        try {
            const BaseUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=FR';
            const response = await axios.get(`${BaseUrl}`, {
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                }
            });
            return response.data.genres;
        } catch {
            throw new FailedToGetGenre();
        }
    }

    async saveGenres(): Promise<GenreEntity[]> {
        try {
            const genres = await this.getGenresByTMDB();
            const genreList = genres.map(this.createGenre);
            return Promise.all(genreList.map(this.saveGenre));
        } catch {
            throw new FailedToSaveGenreError();
        }
    }

    async getGenreForMovie(movieData: any): Promise<GenreEntity[]> {
        return Promise.all(movieData.genre_ids.map((id: number) => this.getGenreById(id)));
    }

    async getGenre(): Promise<GenreEntity[]> {
        const genres =  await this.genreRepository.getAllGenre();
        if(genres.length==0) throw new FailedToGetGenre();
        return genres;
    }
}
