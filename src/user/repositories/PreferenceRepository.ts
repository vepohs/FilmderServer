import {Repository} from "typeorm";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../entities/UserEntity";
import {GenrePreferenceEntity} from "../entities/PreferenceGenreEntity";
import {GenreEntity} from "../../movie/entites/GenreEntity";
import {ProviderRepository} from "../../provider/repository/providerRepository";
import {PreferenceProviderEntity} from "../entities/PreferenceProviderEntity";
import {ProviderEntity} from "../../movie/entites/ProviderEntity";

export class PreferenceRepository {
    private preferenceGenreRepository: Repository<GenrePreferenceEntity>;
    private preferenceProviderRepository: Repository<PreferenceProviderEntity>;

    constructor() {
        this.preferenceGenreRepository = dataSource.getRepository(GenrePreferenceEntity);
        this.preferenceProviderRepository = dataSource.getRepository(PreferenceProviderEntity);
    }

    async saveGenrePreferences(preferences: GenrePreferenceEntity[]): Promise<GenrePreferenceEntity[]> {
        return await this.preferenceGenreRepository.save(preferences);
    }

    async getGenrePreferences(user: UserEntity): Promise<GenreEntity[]> {
        const preferences = await this.preferenceGenreRepository.find({
            where: { user: { id: user.id } },
            relations: ['genre']
        });
        return preferences.map(preference => preference.genre);
    }
    async getProviderPreference(user:UserEntity): Promise<ProviderEntity[]> {
        const provider = await this.preferenceProviderRepository.getProvider(user);
        return provider;
    }

}
