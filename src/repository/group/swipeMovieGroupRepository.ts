import dataSource from "../../dataBase/dataSource";
import {MovieGroupEntity} from "../../entity/MovieGroupEntity";
import {Repository} from "typeorm";
import {MovieEntity} from "../../entity/MovieEntity";
import {GroupEntity} from "../../entity/GroupEntity";

export class SwipeMovieGroupRepository {
    swipeMovieGroupRepository: Repository<MovieGroupEntity>

    constructor() {
        this.swipeMovieGroupRepository = dataSource.getRepository(MovieGroupEntity)
    }
    async saveSwipeMovieGroup(movieGroup: MovieGroupEntity): Promise<MovieGroupEntity> {
        return await this.swipeMovieGroupRepository.save(movieGroup);
    }

    async getMoviesByGroup(group: GroupEntity): Promise<MovieGroupEntity[]> {
        return await this.swipeMovieGroupRepository.find({
            where: { group: { groupId: group.groupId } }, // Filtrer par l'ID du groupe
            relations: ['group', 'movie'], // Charger les relations nécessaires
        });
    }
}