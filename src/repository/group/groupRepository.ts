import {GroupEntity} from "../../entity/GroupEntity";
import dataSource from "../../dataBase/dataSource";
import {UserEntity} from "../../entity/UserEntity";
import {AlreadyInGroupError, CannotSaveGroupError, GroupError, NoGroupError} from "../../error/groupError";

export class GroupRepository {
    private readonly groupRepository = dataSource.getRepository(GroupEntity);

    async saveGroup(group: GroupEntity) {
        try {
            return await this.groupRepository.save(group);
        } catch (error) {
            throw new  CannotSaveGroupError(`Failed to save group: ${error instanceof Error ? error.message : String(error)}`);
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
    async getGroupsByUser(user:UserEntity): Promise<GroupEntity[]> {

        const groups = await this.groupRepository.find({
            where: { users: { id: user.id } },
            relations: ['users'],
        });
        return groups;
    }

}
