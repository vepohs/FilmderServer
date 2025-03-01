import {PreferenceService} from "./preferenceService";
import {UserService} from "../user/userService";
import {UserPayloadType} from "../../type/Type";
import {createPreferenceService, createUserService} from "../../factories/classFactory";
import {UserEntity} from "../../entity/UserEntity";

export class PreferenceUserService {
    private readonly preferenceService = createPreferenceService();


    async getGenrePreference(user: UserEntity) {
        if (user) return await this.preferenceService.getGenrePreference(user);
    }

    async getProviderPreference(user: UserEntity) {
        if (user) return await this.preferenceService.getProviderPreference(user);
    }
}