import dataSource from "../dataBase/dataSource";
import {GenreEntity} from "../movie/entites/GenreEntity";
import {Repository} from "typeorm";

export class GenreRepository {
    private repository: Repository<GenreEntity>;

    constructor() {
        this.repository = dataSource.getRepository(GenreEntity);
    }

    async saveGenre(genre: GenreEntity): Promise<GenreEntity> {
        return await this.repository.save(genre);
    }

    async findById(id: number): Promise<GenreEntity | null> {
        return await this.repository.findOne({ where: { id } });
    }
}