import {IUserModel} from "../models/user.model";
import {StatusId} from "constants/status";

export interface IUserPopulateService {
    _id: string
    name: string,
    url: string,
    image: string
}

export type IUserGetResultService = {
    isOnline?: boolean
} & IUserModel

export interface IUserGetWithURLParamService {
    url: string
    statusId?: StatusId
}