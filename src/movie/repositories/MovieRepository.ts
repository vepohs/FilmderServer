import {In, Not, Repository} from 'typeorm';
import {MovieEntity} from '../entites/MovieEntity';
import dataSource from "../../dataBase/dataSource";
import {GenreEntity} from "../entites/GenreEntity";
import {ProviderEntity} from "../entites/ProviderEntity";

export class MovieRepository {
    private repository: Repository<MovieEntity>;


    constructor() {
        this.repository = dataSource.getRepository(MovieEntity);

    }

    async saveMovie(movie: MovieEntity): Promise<MovieEntity> {
        const savedMovie = await this.repository.save(movie);
        return savedMovie;
    }

    async getMovie(genres: GenreEntity[], providers: ProviderEntity[],excludeIds:number[]): Promise<MovieEntity[]> {
        const movies = await this.repository.find({
            where: [
                {
                    genres: {id: In(genres.map(genre => genre.id))},
                    providers: {id: In(providers.map(provider => provider.id))},
                    id: Not(In(excludeIds))
                }
            ],
            relations: ['genres', 'providers'],
            take: 20
        });
        return movies;
    }
    async checkExistingMovies(movies: MovieEntity[]): Promise<number[]> {
        const movieIds = movies.map(movie => movie.id);
        const existingMovies = await this.repository.find({
            where: { id: In(movieIds) },
            select: ['id']
        });
        return existingMovies.map(movie => movie.id);
    }


    async getMovieById(movieId: number) {
        return this.repository.findOne({where: {id: movieId}});
    }

}
