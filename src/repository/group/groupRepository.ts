import {GroupEntity} from "../../entity/GroupEntity";
import {UserEntity} from "../../entity/UserEntity";
import {GroupGenrePreferenceEntity} from "../../entity/GroupGenrePreferenceEntity";
import {GroupProviderPreferenceEntity} from "../../entity/GroupProviderPreferenceEntity";
import {Repository} from "typeorm";
import {ProviderEntity} from "../../entity/ProviderEntity";
import {GenreEntity} from "../../entity/GenreEntity";

export class GroupRepository {

    constructor(private readonly groupRepository: Repository<GroupEntity>,
                private readonly groupPreferenceGenreRepository: Repository<GroupGenrePreferenceEntity>,
                private readonly groupPreferenceProviderRepository: Repository<GroupProviderPreferenceEntity>) {
    }

    getProvider = (groupPreferenceProviderEntity: GroupProviderPreferenceEntity) => groupPreferenceProviderEntity.provider;
    getGenre = (groupPreferenceGenreEntity: GroupGenrePreferenceEntity) => groupPreferenceGenreEntity.genre;

    async saveGroup(group: GroupEntity) {
        return await this.groupRepository.save(group);
    }

    async joinGroup(userEntity: UserEntity, group: GroupEntity): Promise<GroupEntity> {
        group.users.push(userEntity);
        return await this.groupRepository.save(group);
    }

    async getGroupsForUser(user: UserEntity): Promise<GroupEntity[]> {

        const groups = await this.groupRepository.find({
            where: {users: {id: user.id}},
        });
        return groups;
    }

    async setGroupGenrePreference(groupPreferenceGenreEntities: GroupGenrePreferenceEntity[], groupId: string) {
        await this.groupPreferenceGenreRepository.delete({groupId});
        return await this.groupPreferenceGenreRepository.save(groupPreferenceGenreEntities);
    }

    async setGroupProviderPreference(groupPreferenceProviderEntity: GroupProviderPreferenceEntity[], groupId: string) {
        await this.groupPreferenceProviderRepository.delete({groupId});
        return await this.groupPreferenceProviderRepository.save(groupPreferenceProviderEntity);
    }

    async getGroupProviderPreference(groupId: string): Promise<ProviderEntity[]> {
        const groupPreferences = await this.groupPreferenceProviderRepository.find({
            where: {group: {groupId}},
            relations: ['provider'],
        });
        return groupPreferences.map(this.getProvider);
    }


    async getGroupGenrePreference(groupId: string): Promise<GenreEntity[]> {
        const groupPreferences = await this.groupPreferenceGenreRepository.find({
            where: {group: {groupId}},
            relations: ['genre'],
        });
        return groupPreferences.map(this.getGenre);
    }


    async getGroupById(groupId: string): Promise<GroupEntity | null> {
        return await this.groupRepository.findOne({
            where: {groupId},
            relations: ['users']
        });
    }

}

