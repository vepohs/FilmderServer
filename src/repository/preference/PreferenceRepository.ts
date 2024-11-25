import {Repository} from "typeorm";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../../entity/UserEntity";
import {GenrePreferenceEntity} from "../../entity/PreferenceGenreEntity";
import {GenreEntity} from "../../entity/GenreEntity";
import {PreferenceProviderEntity} from "../../entity/PreferenceProviderEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {CannotSaveGenreError} from "../../error/genreError";
import {
    CannotGetGenrePreferenceError, CannotGetProviderPreferenceError,
    CannotSaveGenrePreferenceError,
    CannotSaveProviderPreferenceError
} from "../../error/preferenceError";

export class PreferenceRepository {
    private preferenceGenreRepository: Repository<GenrePreferenceEntity>;
    private preferenceProviderRepository: Repository<PreferenceProviderEntity>;

    constructor() {
        this.preferenceGenreRepository = dataSource.getRepository(GenrePreferenceEntity);
        this.preferenceProviderRepository = dataSource.getRepository(PreferenceProviderEntity);
    }

    async saveGenrePreferences(genrePreference: GenrePreferenceEntity[],userEntity:UserEntity): Promise<GenrePreferenceEntity[]> {
        try {
            await this.preferenceGenreRepository.delete({ user: { id: userEntity.id } });
            return await this.preferenceGenreRepository.save(genrePreference);
        } catch (error) {
            throw new CannotSaveGenrePreferenceError(`Failed to save the genrePreference ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async saveProviderPreference(providerPreference: PreferenceProviderEntity[],userEntity:UserEntity): Promise<PreferenceProviderEntity[]> {
        try {
            await this.preferenceProviderRepository.delete({ user: { id: userEntity.id } });
            return await this.preferenceProviderRepository.save(providerPreference);
        } catch (error) {
            throw new CannotSaveProviderPreferenceError(`Failed to save the providerPreference ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async getGenrePreferences(user: UserEntity): Promise<GenreEntity[]> {
        try {
            const preferences = await this.preferenceGenreRepository.find({
                where: {user: {id: user.id}},
                relations: ['genre']
            });
            return preferences.map(preference => preference.genre);
        } catch (error) {
            throw new CannotGetGenrePreferenceError(`Failed to get the providerPreference ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    async getProviderPreference(user: UserEntity): Promise<ProviderEntity[]> {
        try {
            const preferenceProviderEntity = await this.preferenceProviderRepository.find({
                where: {user: {id: user.id}},
                relations: ['provider']
            });
            return preferenceProviderEntity.map(preference => preference.provider);
        } catch (error) {
            throw new CannotGetProviderPreferenceError(`Failed to get the providerPreference ${error instanceof Error ? error.message : String(error)}`)
        }
    }
}
