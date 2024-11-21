import {UserPayloadType} from "../type/authType";
import {Request} from "express";

export interface AddGroupInput {
    user: UserPayloadType;
    name: string;
}

export interface AuthenticatedRequest extends Request {
    user?: UserPayloadType;
}

export interface JoinGroupInput {
    user: UserPayloadType;
    groupId: string;
}