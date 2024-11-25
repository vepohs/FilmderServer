import {GroupRepository} from "../../repository/group/groupRepository";
import {GroupEntity} from "../../entity/GroupEntity";
import {UserService} from "../user/userService";
import {UserEntity} from "../../entity/UserEntity";
import {UserPayloadType} from "../../type/authType";
import {NoUserError, UserError} from "../../error/userError";
import {GroupError} from "../../error/groupError";
import {GroupGenrePreferenceEntity} from "../../entity/GroupGenrePreferenceEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {PreferenceProviderEntity} from "../../entity/PreferenceProviderEntity";
import {GroupProviderPreferenceEntity} from "../../entity/GroupProviderPreferenceEntity";

interface AddGroupInput {
    user: UserPayloadType;
    name: string;
}

interface JoinGroupInput {
    user: UserPayloadType;
    groupId: string;
}


export class GroupService {
    private readonly groupRepository: GroupRepository;
    private readonly userService: UserService;

    constructor() {
        this.groupRepository = new GroupRepository();
        this.userService = new UserService();
    }


    async addGroup(input: AddGroupInput): Promise<GroupEntity> {
        const user = await this.userService.findByEmail(input.user.email);
        try {
            const groupEntity = await this.createGroupEntity(user, input.name);
            return await this.groupRepository.saveGroup(groupEntity);
        } catch (error) {
            throw new GroupError(500, `Failed to create group: ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    private async createGroupEntity(userEntity: UserEntity, name: string): Promise<GroupEntity> {
        const groupEntity = new GroupEntity();
        groupEntity.name = name;
        groupEntity.owner = userEntity;
        groupEntity.users = [userEntity];
        return groupEntity;
    }

    async joinGroup(input: JoinGroupInput) {
        const user = await this.userService.findByEmail(input.user.email);
        return await this.groupRepository.joinGroup(input.groupId, user);
    }

    async getGroupsByUser(userPayload: UserPayloadType): Promise<GroupEntity[]> {
        const user = await this.userService.findByEmail(userPayload.email);
        return await this.groupRepository.getGroupsByUser(user);
    }

    async setGroupPreference(groupId: number, genreIds: number[], providerIds: number[]) {
        const groupPreferenceProviderEntities = await this.buildProviderEntities(groupId,providerIds);
        const groupPreferenceEntities = await this.buildGroupPreferenceEntities(groupId, genreIds);
         await this.groupRepository.setGroupGenrePreference(groupPreferenceEntities,groupId);
         await this.groupRepository.setGroupProviderPreference(groupPreferenceProviderEntities,groupId);
    }

    async buildGroupPreferenceEntities(groupId: number, genreIds: number[]) {
        return  genreIds.map((genreId) => {
            const groupGenrePreferenceEntity = new GroupGenrePreferenceEntity();
            groupGenrePreferenceEntity.groupId = groupId;
            groupGenrePreferenceEntity.genreId = genreId;
            return groupGenrePreferenceEntity;
        })
    }

    private async buildProviderEntities(groupId:number,providerIds: number[]) {
        return  providerIds.map((providerId) => {
            const groupProviderPreferenceEntity = new GroupProviderPreferenceEntity();
            groupProviderPreferenceEntity.groupId = groupId;
            groupProviderPreferenceEntity.providerId = providerId;
            return groupProviderPreferenceEntity;
        })
    }

    async getGroupProviderPreference(groupId:number) {
        return await this.groupRepository.getGroupProviderPreference(groupId);
    }

    async getGroupGenrePreference(groupId:number) {
        return await this.groupRepository.getGroupGenrePreference(groupId);
    }
}
