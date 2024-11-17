import { GroupEntity } from "../user/entities/GroupEntity";
import dataSource from "../dataBase/dataSource";
import { UserEntity } from "../user/entities/UserEntity";

export class GroupRepository {
    private readonly groupRepository = dataSource.getRepository(GroupEntity);
    async saveGroup(group: GroupEntity) {
     return await this.groupRepository.save(group);
    }

    async joinGroup(groupId: string, userEntity: UserEntity): Promise<GroupEntity | null> {
        try {
            const group = await this.groupRepository.findOne({
                where: { groupId },
                relations: ['users']
            });
            if (!group) {
                return null;
            }
            const alreadyMember = group.users.some(user => user.id === userEntity.id);
            if (alreadyMember) {
                return group;
            }
            group.users.push(userEntity);
            return await this.groupRepository.save(group);
        } catch (error) {
            return null;
        }
    }
}
