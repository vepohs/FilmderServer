import {Repository} from "typeorm";
import {SwipeEntity} from "../../entity/SwipeEntity";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../../entity/UserEntity";


export class SwipeRepository {
    private swipeRepository: Repository<SwipeEntity>

    constructor() {
        this.swipeRepository = dataSource.getRepository(SwipeEntity);
    }

    async saveSwipe(SwipeEntity: SwipeEntity): Promise<SwipeEntity> {
        return await this.swipeRepository.save(SwipeEntity);
    }

    async getExcludedMovies(user: UserEntity) {
        const swipeEntities = await this.swipeRepository.find({
            where: {user: {id: user.id}},
            relations: ['movie']
        });
        return swipeEntities.map(swipe => swipe.movie).map(movie => movie.id);
    }

    async getMovieLiked(userId: number) {
        const swipeEntities = await this.swipeRepository.find({
            where: {user: {id: userId}, liked: true},
            relations: ['movie','movie.genres','movie.providers']
        });

        return swipeEntities.map(swipe => swipe.movie);
    }

    async getMovieDisliked(user: UserEntity) {
        const swipeEntities = await this.swipeRepository.find({
            where: {user: {id: user.id}, liked: false},
            relations: ['movie','movie.genres']
        });
        return swipeEntities.map(swipe => swipe.movie);
    }
    async getSwipeMovie(user: UserEntity) {
        const swipeEntities = await this.swipeRepository.find({
            where: {user: {id: user.id}},
            relations: ['movie']
        });
        return swipeEntities.map(swipe => swipe.movie);
    }
}