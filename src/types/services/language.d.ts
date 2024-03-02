import {LanguageDocument} from "../models/language";

export type LanguageGetResultDocument = {} & LanguageDocument

export interface LanguageGetOneParamDocument {
    _id?: string
    shortKey?: string
    locale?: string
}

export interface LanguageGetManyParamDocument {
    _id?: string[]
    statusId?: number
}