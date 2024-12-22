import {GenreEntity} from "../../entity/GenreEntity";
import {Repository} from "typeorm";

export class GenreRepository {

    constructor(private readonly repository: Repository<GenreEntity>) {
    }

    async saveGenre(genre: GenreEntity): Promise<GenreEntity> {
        return this.repository.save(genre);
    }

    async findGenreByID(id: number): Promise<GenreEntity | null> {
        return  await this.repository.findOne({where: {id}});
    }

    async getAllGenre(): Promise<GenreEntity[]> {
        return await this.repository.find();
    }
}