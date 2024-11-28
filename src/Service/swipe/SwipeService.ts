import {SwipeRepository} from "../../repository/swipe/SwipeRepository";
import {SwipeEntity} from "../../entity/SwipeEntity";
import {MovieServices} from "../movie/MovieServices";
import {UserService} from "../user/userService";
import {MovieEntity} from "../../entity/MovieEntity";
import {UserEntity} from "../../entity/UserEntity";
import {UserPayloadType} from "../../type/Type";

export class SwipeService {
    private readonly swipeRepository: SwipeRepository;
    private readonly movieService = new MovieServices();
    private readonly userService = new UserService();

    constructor() {
        this.swipeRepository = new SwipeRepository();
    }

    async saveSwipe(userPayload: UserPayloadType, movieId: number, liked: boolean): Promise<SwipeEntity> {
        const user = await this.userService.findByEmail(userPayload.email);
        const movie = await this.movieService.getMovieById(movieId);
        const swipeEntity = this.createSwipe(user!, movie!, liked);
        return await this.swipeRepository.saveSwipe(swipeEntity);
    }

    createSwipe(user: UserEntity, movie: MovieEntity, liked: boolean): SwipeEntity {
        const swipe = new SwipeEntity();
        swipe.user = user;
        swipe.movie = movie;
        swipe.liked = liked;
        return swipe;
    }


    async getMovieLiked(listUserIds: number[]) {
        return await Promise.all(
            listUserIds.map(async (userId) => {
                const movies = await this.swipeRepository.getMovieLiked(userId);
                return { userId, movies };
            })
        );

    }


}