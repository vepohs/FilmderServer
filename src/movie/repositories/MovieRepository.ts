import { Repository } from 'typeorm';
import { MovieEntity } from '../entites/MovieEntity';
import dataSource from "../../dataBase/dataSource";

export class MovieRepository {
    private repository: Repository<MovieEntity>;

    constructor() {
        this.repository = dataSource.getRepository(MovieEntity);
    }
    async saveMovie(movie: MovieEntity): Promise<MovieEntity> {
        return await this.repository.save(movie);
    }
}
