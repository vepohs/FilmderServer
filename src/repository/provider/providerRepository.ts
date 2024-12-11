import {ProviderEntity} from "../../entity/ProviderEntity";
import dataSource from "../../dataBase/dataSource";
import {Repository} from "typeorm";
import {GenreEntity} from "../../entity/GenreEntity";

export class ProviderRepository {

    constructor(private readonly repository: Repository<ProviderEntity>) {
    }

    async saveProvider(provider: ProviderEntity): Promise<ProviderEntity> {
        return await this.repository.save(provider);
    }

    async getAllProvider() {
        return this.repository.find();
    }

    async getProviderById(providerId: number): Promise<ProviderEntity |null> {
        return await this.repository.findOne({
            where: {id: providerId}
        });
    }
}