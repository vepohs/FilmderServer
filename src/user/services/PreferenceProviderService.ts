import {PreferenceProviderRepository} from '../repositories/PreferenceProviderRepository';

import {ProviderEntity} from '../../movie/entites/ProviderEntity';
import {UserService} from "./userService";
import {UserEntity} from "../entities/UserEntity";

export class PreferenceProviderService {
    private preferenceRepository: PreferenceProviderRepository;
    private userService: UserService;

    constructor() {
        this.preferenceRepository = new PreferenceProviderRepository();
        this.userService = new UserService();
    }
//todo a faire
    async saveProviderPreference(user:UserEntity): Promise<void> {

    }

    async getProviderPreference(user:UserEntity): Promise<ProviderEntity[]> {
        const provider = await this.preferenceRepository.getProvider(user);
        return provider;
    }
}
