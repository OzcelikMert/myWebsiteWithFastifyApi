import {UserPopulateDocument} from "./user";
import {ComponentDocument, ComponentTypeContentDocument, ComponentTypeDocument} from "types/models/component";

export type ComponentGetResultDocument = {
    authorId: UserPopulateDocument,
    lastAuthorId: UserPopulateDocument,
    types: (Omit<ComponentTypeDocument, "contents"> & {
        contents?: ComponentTypeContentDocument
    })[]
} & Omit<ComponentDocument, "types"|"authorId"|"lastAuthorId">

export interface ComponentGetOneParamDocument {
    _id?: string
    langId?: string,
    elementId?: string
}

export interface ComponentGetManyParamDocument {
    _id?: string[]
    langId?: string,
    elementId?: string[]
}