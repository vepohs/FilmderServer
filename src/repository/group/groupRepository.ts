import {GroupEntity} from "../../entity/GroupEntity";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../../entity/UserEntity";
import {AlreadyInGroupError, CannotSaveGroupError, GroupError, NoGroupError} from "../../error/groupError";
import {GroupGenrePreferenceEntity} from "../../entity/GroupGenrePreferenceEntity";
import {GroupProviderPreferenceEntity} from "../../entity/GroupProviderPreferenceEntity";

export class GroupRepository {
    private readonly groupRepository = dataSource.getRepository(GroupEntity);
    private readonly groupPreferenceGenreRepository = dataSource.getRepository(GroupGenrePreferenceEntity);
    private readonly groupPreferenceProviderRepository = dataSource.getRepository(GroupProviderPreferenceEntity);

    async saveGroup(group: GroupEntity) {
        try {
            return await this.groupRepository.save(group);
        } catch (error) {
            throw new CannotSaveGroupError(`Failed to save group: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async joinGroup(groupId: string, userEntity: UserEntity): Promise<GroupEntity> {
        try {
            const group = await this.groupRepository.findOne({
                where: {groupId},
                relations: ['users']
            });
            if (!group) {
                throw new NoGroupError();
            }
            const alreadyMember = group.users.some(user => user.id === userEntity.id);
            if (alreadyMember) {
                throw new AlreadyInGroupError()
            }
            group.users.push(userEntity);
            return await this.groupRepository.save(group);
        } catch (error) {
            throw new GroupError(500, `Failed to join group: ${error instanceof Error ? error.message : String(error)}`);
        }

    }

    async getGroupsByUser(user: UserEntity): Promise<GroupEntity[]> {

        const groups = await this.groupRepository.find({
            where: {users: {id: user.id}},
            relations: ['users'],
        });
        return groups;
    }

    async setGroupGenrePreference(groupPreferenceGenreEntities: GroupGenrePreferenceEntity[], groupId: number) {
        try {
            await this.groupPreferenceGenreRepository.delete({groupId});
            return await this.groupPreferenceGenreRepository.save(groupPreferenceGenreEntities);

        } catch (error) {
            throw new Error(`Failed to set group preferences: ${error instanceof Error ? error.message : String(error)}`);
        }

    }

    async setGroupProviderPreference(groupPreferenceProviderEntity: GroupProviderPreferenceEntity[], groupId: number) {
        try {
            await this.groupPreferenceProviderRepository.delete({groupId});
            return await this.groupPreferenceProviderRepository.save(groupPreferenceProviderEntity);
        } catch (error) {
            throw new Error(`Failed to set group preferences: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getGroupProviderPreference(groupId: number) {
        return await this.groupPreferenceProviderRepository.find({
            where: {groupId}
        });
    }

    async getGroupGenrePreference(groupId:number) {
        return await this.groupPreferenceGenreRepository.find({
            where: {groupId}
        });
    }
}

