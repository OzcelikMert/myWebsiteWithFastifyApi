import {ILanguageModel} from "../models/language.model";
import {StatusId} from "constants/status";

export type ILanguageGetResultService = {} & ILanguageModel

export interface ILanguageGetWithIdParamService {
    _id: string
    shortKey?: string
    locale?: string
}

export interface ILanguageGetManyParamService {
    _id?: string[]
    statusId?: StatusId
}