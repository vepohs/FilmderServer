import {SwipeRepository} from "../repositories/SwipeRepository";
import {SwipeEntity} from "../../movie/entites/SwipeEntity";
import {UserType} from "../type/userType";
import {PayloadType} from "../../authentification/type/UserPayLoad";
import {MovieServices} from "../../movie/services/MovieServices";
import {UserService} from "./userService";
import {MovieEntity} from "../../movie/entites/MovieEntity";
import {UserEntity} from "../entities/UserEntity";

export class SwipeService {
    private readonly swipeRepository: SwipeRepository;
    private readonly movieService = new MovieServices();
    private readonly userService = new UserService();

    constructor() {
        this.swipeRepository = new SwipeRepository();
    }

    async saveSwipe(userPayload: PayloadType, movieId: number, liked: boolean): Promise<SwipeEntity> {
        const user = await this.userService.findByEmail(userPayload.email);
        const movie = await this.movieService.getMovieById(movieId);
        const swipeEntity = this.createSwipe(user!, movie!, liked);
        return await this.swipeRepository.saveSwipe(swipeEntity);
    }

    createSwipe(user: UserEntity, movie: MovieEntity, liked: boolean): SwipeEntity {
        const swipe = new SwipeEntity();
        swipe.user = user;
        swipe.movie = movie;
        swipe.like = liked;
        return swipe;
    }

    async getExcludedMoviesId(user: UserEntity) {
        return (await this.swipeRepository.getExcludedMovies(user)).map((movie) => movie.id);
    }
}