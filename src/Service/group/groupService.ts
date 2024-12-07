import {GroupRepository} from "../../repository/group/groupRepository";
import {GroupEntity} from "../../entity/GroupEntity";
import {UserService} from "../user/userService";
import {UserEntity} from "../../entity/UserEntity";
import {UserPayloadType} from "../../type/Type";
import {NoUserError, UserError} from "../../error/userError";
import {GroupError} from "../../error/groupError";
import {GroupGenrePreferenceEntity} from "../../entity/GroupGenrePreferenceEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {PreferenceProviderEntity} from "../../entity/PreferenceProviderEntity";
import {GroupProviderPreferenceEntity} from "../../entity/GroupProviderPreferenceEntity";
import {ProviderService} from "../provider/providerService";
import {GenreService} from "../genre/GenreServices";
import {setGroupPreference} from "../../controller/group/setGroupPreferenceController";
import {PreferenceService} from "../preference/PreferenceService";

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
    private readonly providerService: ProviderService;
    private readonly genreService: GenreService;
    private readonly preferenceService: PreferenceService;

    constructor() {
        this.groupRepository = new GroupRepository();
        this.userService = new UserService();
        this.providerService = new ProviderService();
        this.genreService = new GenreService();
        this.preferenceService = new PreferenceService();
    }


    async addGroup(input: AddGroupInput): Promise<GroupEntity> {
        const user = await this.userService.findByEmail(input.user.email);
        const genrePreference = await this.preferenceService.getGenrePreference(user)
        const providerPreference = await this.preferenceService.getProviderPreference(user)

        try {
            const groupEntity = await this.createGroupEntity(user, input.name);
            const savedGroup = await this.groupRepository.saveGroup(groupEntity);
            if (savedGroup)
                await this.setGroupPreference(savedGroup.groupId, genrePreference.map(genreEntity => genreEntity.id), providerPreference.map(providerEntity => providerEntity.id))
            return savedGroup
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

    async setGroupPreference(groupId: string, genreIds: number[], providerIds: number[]) {
        const groupPreferenceProviderEntities = await this.buildProviderEntities(groupId, providerIds);
        const groupPreferenceEntities = await this.buildGroupPreferenceEntities(groupId, genreIds);
        await this.groupRepository.setGroupGenrePreference(groupPreferenceEntities, groupId);
        await this.groupRepository.setGroupProviderPreference(groupPreferenceProviderEntities, groupId);
    }

    async buildGroupPreferenceEntities(groupId: string, genreIds: number[]) {
        return genreIds.map((genreId) => {
            const groupGenrePreferenceEntity = new GroupGenrePreferenceEntity();
            groupGenrePreferenceEntity.groupId = groupId;
            groupGenrePreferenceEntity.genreId = genreId;
            return groupGenrePreferenceEntity;
        })
    }

    private async buildProviderEntities(groupId: string, providerIds: number[]) {
        return providerIds.map((providerId) => {
            const groupProviderPreferenceEntity = new GroupProviderPreferenceEntity();
            groupProviderPreferenceEntity.groupId = groupId;
            groupProviderPreferenceEntity.providerId = providerId;
            return groupProviderPreferenceEntity;
        })
    }

    async getGroupProviderPreference(groupId: string) {
        const groupProviderEntity = await this.groupRepository.getGroupProviderPreference(groupId);
        const groupProviderEntities = await Promise.all(
            groupProviderEntity.map((groupProvider) => this.providerService.getProviderById(groupProvider.providerId)));
        if (groupProviderEntities)
            return groupProviderEntities
        else
            throw new GroupError(404, `No provider preference found for group ${groupId}`)
    }

    async getGroupGenrePreference(groupId: string) {
        //todo meilleur gestion d'erreur
        const groupGenreEntity = await this.groupRepository.getGroupGenrePreference(groupId);
        const groupGenreEntities = await Promise.all(
            groupGenreEntity.map((groupGenre) => this.genreService.getGenreById(groupGenre.genreId))
        );
        if (groupGenreEntities)
            return groupGenreEntities
        else
            throw new GroupError(404, `No genre preference found for group ${groupId}`)
    }

    async getAllUsersIdsByGroup(group: GroupEntity) {
        return (await this.groupRepository.getAllUsersByGroup(group.groupId)).map((user) => user.id);
    }

    async getAllUsersByGroup(group: GroupEntity) {
        return (await this.groupRepository.getAllUsersByGroup(group.groupId)).map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }));
    }

    async getGroupById(groupId: string) {
        return await this.groupRepository.getGroupById(groupId);
    }

}
