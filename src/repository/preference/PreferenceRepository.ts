import {Repository} from "typeorm";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../../entity/UserEntity";
import {GenrePreferenceEntity} from "../../entity/PreferenceGenreEntity";
import {GenreEntity} from "../../entity/GenreEntity";
import {PreferenceProviderEntity} from "../../entity/PreferenceProviderEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {FailedToSaveGenreError} from "../../error/genreError";
import {
    FailedToGetGenrePreferenceError, FailedToGetProviderPreferenceError,
    FailedToSaveGenrePreferenceError,
    FailedToSaveProviderPreferenceError
} from "../../error/preferenceError";

export class PreferenceRepository {

    constructor(private readonly preferenceGenreRepository: Repository<GenrePreferenceEntity>,
                private readonly preferenceProviderRepository: Repository<PreferenceProviderEntity>) {
    }

    async saveGenrePreferences(genrePreference: GenrePreferenceEntity[], userEntity: UserEntity): Promise<GenrePreferenceEntity[]> {
        try {
            await this.preferenceGenreRepository.delete({user: {id: userEntity.id}});
            return await this.preferenceGenreRepository.save(genrePreference);
        } catch (error) {
            throw new FailedToSaveGenrePreferenceError()
        }
    }

    async saveProviderPreference(providerPreference: PreferenceProviderEntity[], userEntity: UserEntity): Promise<PreferenceProviderEntity[]> {
        try {
            await this.preferenceProviderRepository.delete({user: {id: userEntity.id}});
            return await this.preferenceProviderRepository.save(providerPreference);
        } catch (error) {
            throw new FailedToSaveProviderPreferenceError()
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
            throw new FailedToGetGenrePreferenceError()
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
            throw new FailedToGetProviderPreferenceError()
        }
    }
}
