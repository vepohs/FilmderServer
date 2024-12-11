import {In, Not, Repository} from 'typeorm';
import {MovieEntity} from '../../entity/MovieEntity';
import {GenreEntity} from "../../entity/GenreEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";

export class MovieRepository {

    constructor(private readonly repository: Repository<MovieEntity>) {}

    async saveMovie(movie: MovieEntity): Promise<MovieEntity> {
            return await this.repository.save(movie);
    }

    async getMovie(genres: GenreEntity[], providers: ProviderEntity[], excludeIds: number[], filmTotake: number): Promise<MovieEntity[]> {

        return await this.repository.find({
            where: [
                {
                    genres: {id: In(genres.map(genre => genre.id))},
                    providers: {id: In(providers.map(provider => provider.id))},
                    id: Not(In(excludeIds))
                }
            ],
            relations: ['genres', 'providers'],
            take: filmTotake
        });
    }

    async checkExistingMovies(movies: MovieEntity[]): Promise<number[]> {

        const movieIds = movies.map(movie => movie.id);
        const existingMovies = await this.repository.find({
            where: {id: In(movieIds)},
            select: ['id']
        });
        return existingMovies.map(movie => movie.id);
    }


    async getMovieById(movieId: number) {
        return this.repository.findOne({where: {id: movieId}});
    }

}
