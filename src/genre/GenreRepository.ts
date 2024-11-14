import dataSource from "../dataBase/dataSource";
import {GenreEntity} from "../movie/entites/GenreEntity";
import {Repository} from "typeorm";

export class GenreRepository {
    private repository: Repository<GenreEntity>;

    constructor() {
        this.repository = dataSource.getRepository(GenreEntity);
    }

    async saveGenre(genre: GenreEntity): Promise<GenreEntity> {
        return  this.repository.save(genre);
    }

    async findById(id: number): Promise<GenreEntity | null> {
        return  this.repository.findOne({where: {id}});
    }

    async getAllGenre() {
        return  this.repository.find();
    }
}