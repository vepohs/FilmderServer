import {Repository} from "typeorm";
import {SwipeEntity} from "../../movie/entites/SwipeEntity";
import dataSource from "../../dataBase/dataSource";


export class SwipeRepository {
    private swipeRepository: Repository<SwipeEntity>

    constructor() {
        this.swipeRepository = dataSource.getRepository(SwipeEntity);
    }

    async saveSwipe(SwipeEntity: SwipeEntity): Promise<SwipeEntity> {
        return await this.swipeRepository.save(SwipeEntity);
    }
}