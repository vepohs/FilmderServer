import {SwipeRepository} from "../repositories/SwipeRepository";
import {SwipeEntity} from "../../movie/entites/SwipeEntity";

export class SwipeService {
    private readonly swipeRepository: SwipeRepository;

    constructor() {
        this.swipeRepository = new SwipeRepository();
    }
    async saveSwipe(SwipeEntity: SwipeEntity): Promise<SwipeEntity> {
        return await this.swipeRepository.saveSwipe(SwipeEntity);
    }
}