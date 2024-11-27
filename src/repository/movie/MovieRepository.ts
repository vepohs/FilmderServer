import {In, Not, Repository} from 'typeorm';
import {MovieEntity} from '../../entity/MovieEntity';
import dataSource from "../../dataBase/dataSource";
import {GenreEntity} from "../../entity/GenreEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {CannotCheckIfExistingMovieError, CannotGetMovieError, CannotSaveMovieError} from "../../error/movieError";

export class MovieRepository {
    private repository: Repository<MovieEntity>;


    constructor() {
        this.repository = dataSource.getRepository(MovieEntity);
    }

//todo gestion erreurs
    async saveMovie(movie: MovieEntity): Promise<MovieEntity> {
        try {
            return await this.repository.save(movie);
        } catch (error) {
            throw new CannotSaveMovieError(`Failed to save the movie ${movie} ${error instanceof Error ? error.message : String(error)}`)
        }

    }

    async getMovie(genres: GenreEntity[], providers: ProviderEntity[], excludeIds: number[],filmTotake:number): Promise<MovieEntity[]> {
        try {
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
        } catch (error) {
            throw new CannotGetMovieError(`Failed to get movie ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async checkExistingMovies(movies: MovieEntity[]): Promise<number[]> {
        try {
            const movieIds = movies.map(movie => movie.id);
            const existingMovies = await this.repository.find({
                where: {id: In(movieIds)},
                select: ['id']
            });
            return existingMovies.map(movie => movie.id);
        } catch (error) {
            throw new CannotCheckIfExistingMovieError(`Failed to get movie ${error instanceof Error ? error.message : String(error)}`)
        }
    }


    async getMovieById(movieId: number) {
        try {
            const movie =this.repository.findOne({where: {id: movieId}});
            if(movie) return movie
            else throw new CannotGetMovieError('Cannot get movie')
        }
         catch (error){
             throw new CannotGetMovieError(`Failed to get movie ${error instanceof Error ? error.message : String(error)}`);
         }

    }

}
