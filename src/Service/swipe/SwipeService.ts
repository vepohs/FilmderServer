import {SwipeRepository} from "../../repository/swipe/SwipeRepository";
import {SwipeEntity} from "../../entity/SwipeEntity";
import {createEntityFactory} from "../../factories/ClassFactory";
import {UserEntity} from "../../entity/UserEntity";
import {MovieEntity} from "../../entity/MovieEntity";
import {FailedToSaveSwipeError} from "../../error/SwipeError";


export class SwipeService {
    private readonly entityFactory = createEntityFactory();

    constructor(private readonly swipeRepository: SwipeRepository) {
    }

    async saveSwipe(user: UserEntity, movie: MovieEntity, liked: boolean): Promise<SwipeEntity> {
        try {
            const swipeEntity = this.entityFactory.createSwipeEntity(user, movie, liked);
            return await this.swipeRepository.saveSwipe(swipeEntity);
        } catch {
            throw new FailedToSaveSwipeError();
        }
    }

    async getUserMovieLiked(userId: number) {
        return await this.swipeRepository.getMovieLiked(userId);
    }

    async getUsersMovieLiked(userIds: number[]) {
        return (await Promise.all(userIds.map(userId => this.getUserMovieLiked(userId)))).flat();
    }

    async getExcludedMovies(user: UserEntity): Promise<MovieEntity[]> {
        return await this.swipeRepository.getExcludedMovies(user);
    }

    async getSwipeMovie(user: UserEntity) {
        return await this.swipeRepository.getSwipeMovie(user);
    }
}