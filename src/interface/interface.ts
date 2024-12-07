import {UserPayloadType} from "../type/Type";
import {Request} from "express";
import {GroupEntity} from "../entity/GroupEntity";

export interface AddGroupInput {
    user: UserPayloadType;
    name: string;
}

export interface AuthenticatedRequest extends Request {
    user?: UserPayloadType;
}
export interface GroupRequest extends AuthenticatedRequest {
    group?: GroupEntity;
}

export interface JoinGroupInput {
    user: UserPayloadType;
    groupId: string;
}