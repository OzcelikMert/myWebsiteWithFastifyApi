import {IUserPopulateService} from "./user.service";
import {IComponentElementModel, IComponentModel} from "types/models/component.model";
import {ComponentTypeId} from "constants/componentTypes";

export interface IComponentAlternateService {
    langId: string
}

export type IComponentGetResultService<T = {[key: string]: any}> = {
    authorId: IUserPopulateService,
    lastAuthorId: IUserPopulateService,
    elements: (IComponentElementModel & {
        alternates?: IComponentAlternateService[]
    })[]
} & Omit<IComponentModel<T>, "elements"|"authorId"|"lastAuthorId">

export interface IComponentGetWithIdParamService {
    _id: string
    langId?: string
}

export interface IComponentGetWithElementIdParamService {
    elementId: string
    langId?: string
}

export interface IComponentGetManyParamService {
    _id?: string[]
    elementId?: string[]
    langId?: string
    typeId?: ComponentTypeId
    withContent?: boolean
}