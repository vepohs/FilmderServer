import {SwipeMovieGroupRepository} from "../../repository/group/swipeMovieGroupRepository";
import {GroupEntity} from "../../entity/GroupEntity";
import {MovieEntity} from "../../entity/MovieEntity";
import {createEntityFactory} from "../../factories/ClassFactory";
import {FailedToGetMovieGroupError, FailedToSaveSwipeMovieGroupError} from "../../error/movieGroupError";

export class SwipeMovieGroupService {
    private readonly factory = createEntityFactory();

    constructor(private readonly swipeMovieGroupRepository: SwipeMovieGroupRepository) {}

    async saveSwipeMovieGroup(group: GroupEntity, movie: MovieEntity, liked: boolean) {

        const swipeMovieGroupEntity = this.factory.createSwipeMovieGroupEntity(group, movie, liked);
        try {
            return this.swipeMovieGroupRepository.saveSwipeMovieGroup(swipeMovieGroupEntity);
        } catch {
            throw new FailedToSaveSwipeMovieGroupError()
        }
    }


    async getMovieGroup(group: GroupEntity): Promise<MovieEntity[]> {
        try {
            return await this.swipeMovieGroupRepository.getMoviesByGroup(group)
        } catch {
            throw new FailedToGetMovieGroupError()
        }
    }
}