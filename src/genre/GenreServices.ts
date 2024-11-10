import { GenreEntity } from "../movie/entites/GenreEntity";
import { GenreRepository } from "./GenreRepository";

export class GenreService {
    private genreRepository: GenreRepository;

    constructor() {
        this.genreRepository = new GenreRepository();
    }

    async getGenreById(id: number): Promise<GenreEntity | null> {
        return await this.genreRepository.findById(id);
    }

}
