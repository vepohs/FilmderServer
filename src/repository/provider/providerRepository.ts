import {ProviderEntity} from "../../entity/ProviderEntity";
import dataSource from "../../dataBase/dataSource";
import {Repository} from "typeorm";
import {GenreEntity} from "../../entity/GenreEntity";

export class ProviderRepository {
    private repository: Repository<ProviderEntity>;

    constructor() {
        this.repository = dataSource.getRepository(ProviderEntity);
    }

    async saveProvider(provider: ProviderEntity): Promise<ProviderEntity> {
        return await this.repository.save(provider);
    }


    async getAllProviderId(): Promise<number[]> {
        const providers = await this.repository.find({
            select: ['id']
        });
        return providers.map(provider => provider.id);
    }

    async getAllProvider() {
        return this.repository.find();
    }

    async getProviderById(providerId: number) {
        const provider = await this.repository.findOne({
            where: { id: providerId }
        });
       return provider;
    }

}