import {PreferenceService} from "./PreferenceService";
import {PayloadType} from "../../authentification/type/UserPayLoad";
import {UserService} from "./userService";

export class PreferenceUserService {
    private readonly preferenceService: PreferenceService;
    private readonly userService: UserService;

    constructor() {
        this.preferenceService = new PreferenceService();
        this.userService = new UserService();
    }

    async getGenrePreference(userPayload: PayloadType) {
        const user = await this.userService.findByEmail(userPayload.email);
        if (user) return  await this.preferenceService.getGenrePreference(user);
    }

    async getProviderPreference(userPayload: PayloadType) {
        const user = await this.userService.findByEmail(userPayload.email);
        if (user) return  await this.preferenceService.getProviderPreference(user);
    }
}