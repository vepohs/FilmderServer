import {PreferenceRepository} from "../../repository/preference/PreferenceRepository";
import {GenreEntity} from "../../entity/GenreEntity";
import {UserEntity} from "../../entity/UserEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {createEntityFactory} from "../../factories/ClassFactory";


export class PreferenceService {

    constructor(private readonly preferenceRepository: PreferenceRepository) {
    }
    private readonly factory = createEntityFactory();

    async saveGenrePreference(user: UserEntity, genreIds: number[]): Promise<void> {
        const genrePreferenceEntities = genreIds.map((genreId) => this.factory.createGenrePreferenceEntity(genreId, user));
        await this.preferenceRepository.saveGenrePreferences(genrePreferenceEntities, user);
    }

    async saveProviderPreference(user: UserEntity, providerIds: number[]): Promise<void> {
        const providerPreferenceEntities = providerIds.map((providerId) => this.factory.createProviderPreferenceEntity(providerId, user));
        await this.preferenceRepository.saveProviderPreference(providerPreferenceEntities, user);
    }

    async getGenrePreference(user: UserEntity): Promise<GenreEntity[]> {
        return await this.preferenceRepository.getGenrePreferences(user);
    }

    async getProviderPreference(user: UserEntity): Promise<ProviderEntity[]> {
        return await this.preferenceRepository.getProviderPreference(user);
    }

}
