import {Repository} from 'typeorm';
import dataSource from '../../dataBase/dataSource';
import {PreferenceProviderEntity} from '../entities/PreferenceProviderEntity';
import {ProviderEntity} from "../../movie/entites/ProviderEntity";
import {UserEntity} from "../entities/UserEntity";

export class PreferenceProviderRepository {
    private repository: Repository<PreferenceProviderEntity>;

    constructor() {
        this.repository = dataSource.getRepository(PreferenceProviderEntity);
    }

    async savePreference(preference: PreferenceProviderEntity): Promise<PreferenceProviderEntity> {
        return await this.repository.save(preference);
    }

    async getProvider(user: UserEntity): Promise<ProviderEntity[]> {
        const preferenceProviderEntity = await this.repository.find({
            where: {user: {id: user.id}},
            relations: ['provider']
        });
        return preferenceProviderEntity.map(preference => preference.provider);
    }
}
