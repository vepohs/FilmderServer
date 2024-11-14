import { PreferenceRepository } from "../repositories/PreferenceRepository";
import { GenrePreferenceEntity } from "../entities/PreferenceGenreEntity";
import { GenreEntity } from "../../movie/entites/GenreEntity";
import { UserService } from "./userService";
import {UserEntity} from "../entities/UserEntity";

export class PreferenceService {
    private preferenceRepository: PreferenceRepository;
    private userService: UserService;


    constructor() {
        this.preferenceRepository = new PreferenceRepository();
        this.userService = new UserService();
    }

    private async buildGenrePreferenceEntities(email: string, genreIds: number[]): Promise<GenrePreferenceEntity[]> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error(`Utilisateur avec l'email ${email} non trouvé`);
        }

        return genreIds.map((genreId) => {
            const genreEntity = new GenreEntity();
            genreEntity.id = genreId;

            const genrePreferenceEntity = new GenrePreferenceEntity();
            genrePreferenceEntity.user = user;
            genrePreferenceEntity.genre = genreEntity;

            return genrePreferenceEntity;
        });
    }


    async saveGenrePreference(email: string, genreIds: number[]): Promise<void> {
        const genrePreferenceEntities = await this.buildGenrePreferenceEntities(email, genreIds);
        await this.preferenceRepository.saveGenrePreferences(genrePreferenceEntities);
    }
    async getGenrePreference(userEntity:UserEntity): Promise<GenreEntity[]> {
      return  this.preferenceRepository.getGenrePreferences(userEntity);
    }

}
