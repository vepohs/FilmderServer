import {SwipeRepository} from "../../repository/swipe/SwipeRepository";
import {SwipeEntity} from "../../entity/SwipeEntity";
import {createEntityFactory, createMovieService} from "../../factories/ClassFactory";
import {UserEntity} from "../../entity/UserEntity";
import {MovieEntity} from "../../entity/MovieEntity";


export class SwipeService {
    private readonly entityFactory = createEntityFactory();

    constructor(private readonly swipeRepository: SwipeRepository) {
    }

    async saveSwipe(user: UserEntity, movie: MovieEntity, liked: boolean): Promise<SwipeEntity> {
        const swipeEntity = this.entityFactory.createSwipeEntity(user, movie, liked);
        return await this.swipeRepository.saveSwipe(swipeEntity);
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