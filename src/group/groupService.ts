import {GroupRepository} from "./groupRepository";
import {GroupEntity} from "../user/entities/GroupEntity";
import {UserService} from "../user/services/userService";
import {PayloadType} from "../authentification/type/UserPayLoad";
import {UserEntity} from "../user/entities/UserEntity";

interface AddGroupInput {
    user: PayloadType;
    name: string;
}

interface JoinGroupInput {
    user: PayloadType;
    groupId: string;
}


export class GroupService {
    private readonly groupRepository: GroupRepository;
    private readonly userService: UserService;

    constructor() {
        this.groupRepository = new GroupRepository();
        this.userService = new UserService();
    }

    private async getUserFromPayload(userPayload: PayloadType): Promise<UserEntity | null> {
        return this.userService.findByEmail(userPayload.email)
    }

    async addGroup(input: AddGroupInput): Promise<GroupEntity | null> {
        const user = await this.getUserFromPayload(input.user);

        if (!user) {
            return null;
        }

        try {
            const groupEntity = await this.createGroupEntity(user, input.name);
            return await this.groupRepository.saveGroup(groupEntity);
        } catch (error) {
            return null;
        }
    }

    private async createGroupEntity(userEntity: UserEntity, name: string): Promise<GroupEntity> {
        const groupEntity = new GroupEntity();
        groupEntity.name = name;
        groupEntity.owner = userEntity;
        return groupEntity;
    }

    async joinGroup(input: JoinGroupInput) {
        const user = await this.getUserFromPayload(input.user);
        if (user)
            return await this.groupRepository.joinGroup(input.groupId, user);
    }
}
