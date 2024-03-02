import {UserPopulateDocument} from "./user";
import {NavigationContentDocument, NavigationDocument} from "../models/navigation";

export type NavigationGetResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    mainId?: {
        _id:  string
        contents: {
            langId: string
            title: string,
            url: string,
        }
    },
    contents?: NavigationContentDocument
} & Omit<NavigationDocument, "contents"|"mainId"|"authorId"|"lastAuthorId">

export interface NavigationGetOneParamDocument {
    _id?: string
    langId?: string
    statusId?: number
}

export interface NavigationGetManyParamDocument {
    _id?: string[]
    langId?: string
    statusId?: number
    ignoreDefaultLanguage?: boolean
}