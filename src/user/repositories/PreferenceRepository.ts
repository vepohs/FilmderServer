import {Repository} from "typeorm";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../entities/UserEntity";
import {GenrePreferenceEntity} from "../entities/PreferenceGenreEntity";

export class PreferenceRepository {
    private repository: Repository<GenrePreferenceEntity>;

    constructor() {
        this.repository = dataSource.getRepository(GenrePreferenceEntity);
    }

    async saveGenrePreferences(preferences: GenrePreferenceEntity[]): Promise<GenrePreferenceEntity[]> {
        return await this.repository.save(preferences);
    }
}
