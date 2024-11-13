import {Repository} from "typeorm";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../entities/UserEntity";
import {GenrePreferenceEntity} from "../entities/PreferenceGenreEntity";
import {GenreEntity} from "../../movie/entites/GenreEntity";

export class PreferenceRepository {
    private repository: Repository<GenrePreferenceEntity>;

    constructor() {
        this.repository = dataSource.getRepository(GenrePreferenceEntity);
    }

    async saveGenrePreferences(preferences: GenrePreferenceEntity[]): Promise<GenrePreferenceEntity[]> {
        return await this.repository.save(preferences);
    }

    async getGenrePreferences(user: UserEntity): Promise<GenreEntity[]> {
        const preferences = await this.repository.find({
            where: { user: { id: user.id } },
            relations: ['genre']
        });
        return preferences.map(preference => preference.genre);
    }

}
