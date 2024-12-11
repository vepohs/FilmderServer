import {GroupRepository} from "../../repository/group/groupRepository";
import {GroupEntity} from "../../entity/GroupEntity";
import {UserEntity} from "../../entity/UserEntity";
import {
    AlreadyInGroupError,
    FailedToGetGroupError,
    FailedToGetGroupGenrePreferenceError,
    FailedToGetGroupProviderPreferenceError,
    FailedToJoinGroupError,
    FailedToSaveGroupError,
    FailedToSaveGroupPreferenceError,
} from "../../error/groupError";
import {EntityFactory} from "../../factories/EntityFactory";
import {createPreferenceService} from "../../factories/ClassFactory";
import {GenreEntity} from "../../entity/GenreEntity";
import {ProviderEntity} from "../../entity/ProviderEntity";


export class GroupService {

    private readonly preferenceService = createPreferenceService()
    private readonly factory = new EntityFactory();

    constructor(private readonly groupRepository: GroupRepository) {
    }

    getId = <T extends { id: number }>(item: T): number => item.id;

    async saveGroup(user: UserEntity, groupName: string): Promise<GroupEntity> {
        try {
            const genrePreference = await this.preferenceService.getGenrePreference(user);
            const providerPreference = await this.preferenceService.getProviderPreference(user)
            const groupEntity = this.factory.createGroupEntity(user, groupName);
            const savedGroup = await this.groupRepository.saveGroup(groupEntity);
            const savedGroupId = savedGroup.groupId;
            const genreIds = genrePreference.map(this.getId);
            const providerIds = providerPreference.map(this.getId);
            await this.setGroupPreference(savedGroupId, genreIds, providerIds)
            return savedGroup
        } catch (error) {
            throw new FailedToSaveGroupError()
        }
    }


    async joinGroup(user: UserEntity, group: GroupEntity): Promise<GroupEntity> {
        const isAlreadyMember = group.users.some(existingUser => existingUser.id === user.id);
        if (isAlreadyMember) throw new AlreadyInGroupError();
        try {
            return await this.groupRepository.joinGroup(user, group);
        } catch {
            throw new FailedToJoinGroupError();
        }
    }

    async getGroupsByUser(user: UserEntity): Promise<GroupEntity[]> {
        const group = await this.groupRepository.getGroupsForUser(user);
        if (group.length === 0) throw new FailedToGetGroupError();
        return group
    }

    async setGroupPreference(groupId: string, genreIds: number[], providerIds: number[]) {
        try {
            const groupPreferenceProviders = providerIds.map(creatProviderId => this.factory.createGroupProviderPreferenceEntity(groupId, creatProviderId));
            const groupPreferenceGenres = genreIds.map(createGenreId => this.factory.createGroupGenrePreferenceEntity(groupId, createGenreId));
            await this.groupRepository.setGroupGenrePreference(groupPreferenceGenres, groupId);
            await this.groupRepository.setGroupProviderPreference(groupPreferenceProviders, groupId);
        } catch {
            throw new FailedToSaveGroupPreferenceError()
        }
    }


    async getGroupProviderPreference(group: GroupEntity):Promise<ProviderEntity[]> {
        const groupId = group.groupId;
        const groupProviderPreference = await this.groupRepository.getGroupProviderPreference(groupId);
        if(groupProviderPreference.length === 0) throw new FailedToGetGroupProviderPreferenceError();
        return groupProviderPreference
    }

    async getGroupGenrePreference(group: GroupEntity): Promise<GenreEntity[]> {
        const groupId = group.groupId;
        const groupGenrePreference = await this.groupRepository.getGroupGenrePreference(groupId);
        if(groupGenrePreference.length === 0) throw new FailedToGetGroupGenrePreferenceError();
        return groupGenrePreference
    }


    async getGroupById(groupId: string): Promise<GroupEntity> {
        const group = await this.groupRepository.getGroupById(groupId);
        if(!group) throw new FailedToGetGroupError();
        return group
    }
}
