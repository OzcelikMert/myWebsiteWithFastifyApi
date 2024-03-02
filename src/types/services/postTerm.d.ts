import {UserPopulateDocument} from "./user";
import {PostTermContentDocument, PostTermDocument} from "../models/postTerm";

export interface PostTermPopulateDocument {
    _id: string,
    typeId: number,
    contents: {
        langId: string,
        title?: string,
        image?: string
        url?: string
    }
}

export interface PostTermAlternateDocument {
    langId: string
    title?: string,
    url?: string
}

export type PostTermGetResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    mainId?: {
        _id: string
        contents: {
            langId: string
            title: string,
            url: string,
        }
    },
    contents?: PostTermContentDocument
    alternates?: PostTermAlternateDocument[],
    postCount?: number
} & Omit<PostTermDocument, "contents"|"authorId"|"lastAuthorId"|"mainId">

export interface PostTermGetOneParamDocument {
    langId?: string
    _id?: string
    typeId: number,
    postTypeId: number,
    url?: string
    statusId?: number,
    ignoreTermId?: string[],
}

export interface PostTermGetManyParamDocument {
    langId?: string
    _id?: string[]
    typeId?: number[],
    postTypeId: number,
    url?: string
    title?: string
    statusId?: number,
    ignoreTermId?: string[],
    count?: number
    page?: number
    withPostCount?: boolean
    ignoreDefaultLanguage?: boolean
}