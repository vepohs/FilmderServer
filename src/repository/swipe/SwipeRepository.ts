import {Repository} from "typeorm";
import {SwipeEntity} from "../../entity/SwipeEntity";
import {UserEntity} from "../../entity/UserEntity";


export class SwipeRepository {

    constructor(private readonly swipeRepository: Repository<SwipeEntity>) {}

    async saveSwipe(SwipeEntity: SwipeEntity): Promise<SwipeEntity> {
        return await this.swipeRepository.save(SwipeEntity);
    }

    async getExcludedMovies(user: UserEntity) {
        const swipeEntities = await this.swipeRepository.find({
            where: {user: {id: user.id}},
            relations: ['movie']
        });
        return swipeEntities.map(swipe => swipe.movie);
    }

    async getMovieLiked(userId: number) {
        const swipeEntities = await this.swipeRepository.find({
            where: {user: {id: userId}, liked: true},
            relations: ['movie', 'movie.genres', 'movie.providers']
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