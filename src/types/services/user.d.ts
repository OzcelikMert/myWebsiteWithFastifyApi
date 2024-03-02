import {UserDocument} from "../models/user";

export interface UserPopulateDocument {
    _id: string
    name: string,
    url: string,
    image: string
}

export type UserGetResultDocument = {
    isOnline?: boolean
} & UserDocument

export interface UserGetOneParamDocument {
    _id?: string
    email?: string
    password?: string
    statusId?: number
    url?: string
    roleId?: number
    ignoreUserId?: string[]
}

export interface UserGetManyParamDocument {
    _id?: string[]
    statusId?: number
    email?: string,
    count?: number,
    page?: number
    roleId?: number
    ignoreUserId?: string[]
}