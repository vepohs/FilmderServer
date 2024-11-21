import dataSource from "../../dataBase/dataSource";
import {GenreEntity} from "../../entity/GenreEntity";
import {Repository} from "typeorm";
import {CannotSaveGenreError, NoGenreError} from "../../error/genreError";

//todo voir si ca peut générer une erreur
// voir si il faut un await
export class GenreRepository {
    private repository: Repository<GenreEntity>;

    constructor() {
        this.repository = dataSource.getRepository(GenreEntity);
    }

    async saveGenre(genre: GenreEntity): Promise<GenreEntity> {
        try {
            return this.repository.save(genre);
        } catch (error) {
            throw new CannotSaveGenreError(`Failed to save group: ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async findGenreByID(id: number): Promise<GenreEntity> {
        const genre = await this.repository.findOne({where: {id}});
        if(genre) return genre
        else throw new NoGenreError();
    }

    async getAllGenre() {
        const genres =  await this.repository.find();
        if(genres) return genres
        else throw new NoGenreError();
    }
}