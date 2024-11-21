import {PreferenceService} from "./PreferenceService";
import {UserService} from "../user/userService";
import {UserPayloadType} from "../../type/authType";

export class PreferenceUserService {
    private readonly preferenceService: PreferenceService;
    private readonly userService: UserService;

    constructor() {
        this.preferenceService = new PreferenceService();
        this.userService = new UserService();
    }

    async getGenrePreference(userPayload: UserPayloadType) {
        const user = await this.userService.findByEmail(userPayload.email);
        if (user) return  await this.preferenceService.getGenrePreference(user);
    }

    async getProviderPreference(userPayload: UserPayloadType) {
        const user = await this.userService.findByEmail(userPayload.email);
        if (user) return  await this.preferenceService.getProviderPreference(user);
    }
}