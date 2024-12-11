import {PreferenceRepository} from "../../repository/preference/PreferenceRepository";
import {GenrePreferenceEntity} from "../../entity/PreferenceGenreEntity";
import {GenreEntity} from "../../entity/GenreEntity";
import {UserService} from "../user/userService";
import {UserEntity} from "../../entity/UserEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {PreferenceProviderEntity} from "../../entity/PreferenceProviderEntity";
import {createUserService} from "../../factories/ClassFactory";

export class PreferenceService {


    constructor(private readonly preferenceRepository:PreferenceRepository) {}

    private async buildGenrePreferenceEntities(user: UserEntity, genreIds: number[]): Promise<GenrePreferenceEntity[]> {
        return genreIds.map((genreId) => {
            const genreEntity = new GenreEntity();
            genreEntity.id = genreId;

            const genrePreferenceEntity = new GenrePreferenceEntity();
            genrePreferenceEntity.user = user;
            genrePreferenceEntity.genre = genreEntity;

            return genrePreferenceEntity;
        });
    }

    async buildProviderPreferenceEntities(user: UserEntity, providerIds: number[]): Promise<PreferenceProviderEntity[]> {
        return providerIds.map((providerId) => {
            const providerEntity = new ProviderEntity();
            providerEntity.id = providerId;

            const providerPreferenceEntity = new PreferenceProviderEntity();
            providerPreferenceEntity.user = user;
            providerPreferenceEntity.provider = providerEntity;
            return providerPreferenceEntity;
        });
    }


    async saveGenrePreference(user: UserEntity, genreIds: number[]): Promise<void> {

        const genrePreferenceEntities = await this.buildGenrePreferenceEntities(user, genreIds);
        await this.preferenceRepository.saveGenrePreferences(genrePreferenceEntities, user);
    }

    async saveProviderPreference(user: UserEntity, providerIds: number[]): Promise<void> {
        const providerPreferenceEntities = await this.buildProviderPreferenceEntities(user, providerIds);
        await this.preferenceRepository.saveProviderPreference(providerPreferenceEntities, user);
    }

    async getGenrePreference(user: UserEntity): Promise<GenreEntity[]> {
        return await this.preferenceRepository.getGenrePreferences(user);
    }

    async getProviderPreference(user: UserEntity): Promise<ProviderEntity[]> {
        return await this.preferenceRepository.getProviderPreference(user);
    }

}
