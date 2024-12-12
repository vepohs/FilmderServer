import dataSource from "../../dataBase/dataSource";
import {SwipeMovieGroupEntity} from "../../entity/SwipeMovieGroupEntity";
import {Repository} from "typeorm";
import {GroupEntity} from "../../entity/GroupEntity";
import {MovieEntity} from "../../entity/MovieEntity";

export class SwipeMovieGroupRepository {
    constructor(private readonly swipeMovieGroupRepository: Repository<SwipeMovieGroupEntity>) {}

    async saveSwipeMovieGroup(movieGroup: SwipeMovieGroupEntity): Promise<SwipeMovieGroupEntity> {
        return await this.swipeMovieGroupRepository.save(movieGroup);
    }

    async getMoviesByGroup(group: GroupEntity): Promise<MovieEntity[]> {
        const movieGroup = await this.swipeMovieGroupRepository.find({
            where: {group: {groupId: group.groupId}},
            relations: ['group', 'movie']
        });
        return movieGroup.map((movieGroup) => movieGroup.movie);
    }
}