import {Request} from "express";
import {GroupEntity} from "../entity/GroupEntity";
import {UserEntity} from "../entity/UserEntity";

export interface AuthenticatedRequest extends Request {
    user?: UserEntity;
}

export interface GroupRequest extends AuthenticatedRequest {
    group?: GroupEntity;
}
