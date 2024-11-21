import {GroupRepository} from "../../repository/group/groupRepository";
import {GroupEntity} from "../../entity/GroupEntity";
import {UserService} from "../user/userService";
import {UserEntity} from "../../entity/UserEntity";
import {UserPayloadType} from "../../type/authType";
import {NoUserError, UserError} from "../../error/userError";
import {GroupError} from "../../error/groupError";

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
            throw new GroupError(500, `Failed to join group: ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    private async createGroupEntity(userEntity: UserEntity, name: string): Promise<GroupEntity> {
        const groupEntity = new GroupEntity();
        groupEntity.name = name;
        groupEntity.owner = userEntity;
        return groupEntity;
    }

    async joinGroup(input: JoinGroupInput) {
        const user = await this.userService.findByEmail(input.user.email);
            return await this.groupRepository.joinGroup(input.groupId, user);
    }
}
