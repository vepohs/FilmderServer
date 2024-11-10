import {ProviderEntity} from "../../../movie/entites/ProviderEntity";
import dataSource from "../../../dataBase/dataSource";
import {Repository} from "typeorm";

export class ProviderRepository {
    private repository: Repository<ProviderEntity>;

    constructor() {
        this.repository = dataSource.getRepository(ProviderEntity);
    }

    async saveProvider(provider: ProviderEntity): Promise<ProviderEntity> {
        return await this.repository.save(provider);
    }

    async getProvidersByIFilmd(id: number): Promise<ProviderEntity[] | null >{
        return await this.repository.find({where: {id}});
    }
}