import {GroupEntity} from "../user/entities/GroupEntity";
import dataSource from "../dataBase/dataSource";

export class GroupRepository {
    private readonly groupRepository;
    constructor() {
        this.groupRepository = dataSource.getRepository(GroupEntity);
    }
    async saveGroup(group: GroupEntity) {
        return this.groupRepository.save(group);
    }

}