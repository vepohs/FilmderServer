import {PreferenceRepository} from "../repositories/PreferenceRepository";
import {GenrePreferenceEntity} from "../entities/PreferenceGenreEntity";
import {GenreEntity} from "../../movie/entites/GenreEntity";
import {UserService} from "./userService";

export class PreferenceService {
    private preferenceRepository: PreferenceRepository;
    private userService : UserService

    constructor() {
        this.preferenceRepository = new PreferenceRepository();
        this.userService = new UserService();
    }
    async updateGenrePreference(genrePreferenceEntity: GenrePreferenceEntity): Promise<GenrePreferenceEntity> {
        return await this.preferenceRepository.updateGenrePreference(genrePreferenceEntity);
    }
    async createGenrePreferenceEntity(email:string,genre : GenreEntity): Promise<GenrePreferenceEntity> {
        const genrePreferenceEntity = new GenrePreferenceEntity();
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error(`Utilisateur avec l'email ${email} non trouvé`);
        }
        genrePreferenceEntity.user = user;
        genrePreferenceEntity.genre = genre;
    }
}