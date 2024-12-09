import {SwipeMovieGroupRepository} from "../../repository/group/swipeMovieGroupRepository";
import {swipeMovieGroup} from "../../controller/group/swipeMovieGroup";
import {MovieGroupEntity} from "../../entity/MovieGroupEntity";
import {GroupService} from "./groupService";
import {MovieServices} from "../movie/MovieServices";
import {GroupEntity} from "../../entity/GroupEntity";
import {MovieEntity} from "../../entity/MovieEntity";

export class SwipeMovieGroupService {
    private readonly swipeMovieGroupRepository: SwipeMovieGroupRepository;

    constructor() {
        this.swipeMovieGroupRepository = new SwipeMovieGroupRepository();
    }

    async saveSwipeMovieGroup(group: GroupEntity, movie: MovieEntity, liked: boolean) {

        const swipeMovieGroupEntity = this.createSwipeMovieGroup(group, movie, liked);
        return this.swipeMovieGroupRepository.saveSwipeMovieGroup(swipeMovieGroupEntity);
    }
    createSwipeMovieGroup(group: GroupEntity, movie: MovieEntity, liked: boolean) {
        const swipeMovieGroupEntity = new MovieGroupEntity();
        swipeMovieGroupEntity.liked = liked;
        swipeMovieGroupEntity.group = group;
        swipeMovieGroupEntity.movie = movie;
        return swipeMovieGroupEntity
    }

    async getMovieGroup(group: GroupEntity) {
      return await  this.swipeMovieGroupRepository.getMoviesByGroup(group)
    }
}