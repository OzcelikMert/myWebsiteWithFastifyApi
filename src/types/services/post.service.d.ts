import {IUserPopulateService} from "types/services/user.service";
import {IPostTermPopulateService} from "types/services/postTerm.service";
import {
    IPostContentModel,
    IPostModel,
    IPostECommerceModel,
    IPostECommerceVariationContentModel,
    IPostECommerceVariationModel
} from "types/models/post.model";
import {PostTypeId} from "@constants/postTypes";
import {PageTypeId} from "@constants/pageTypes";
import {StatusId} from "@constants/status";
import {IComponentModel} from "types/models/component.model";
import {PostSortTypeId} from "@constants/postSortTypes";

export interface IPostAlternateService {
    langId: string
    title?: string,
    url?: string
}

export type IPostGetOneResultService = {
    authorId: IUserPopulateService,
    lastAuthorId: IUserPopulateService,
    authors?: IUserPopulateService[],
    views?: number,
    categories?: IPostTermPopulateService[]
    tags?: IPostTermPopulateService[]
    contents?: IPostContentModel
    alternates?: IPostAlternateService[]
    eCommerce?: (Omit<IPostECommerceModel<IPostTermPopulateService, IPostTermPopulateService[]>, "variations"> & {
        variations?: (Omit<IPostECommerceVariationModel<IPostTermPopulateService>, "contents"> & {
            contents?: IPostECommerceVariationContentModel
            alternates?: IPostAlternateService[]
        })[]
    })
    components?: IComponentModel[]
} & Omit<IPostModel, "contents"|"categories"|"tags"|"eCommerce"|"authorId"|"lastAuthorId"|"components"|"authors">

export type IPostGetManyResultService = {
    eCommerce?: (Omit<IPostECommerceModel, "variations"> & {
        variations?: (Omit<IPostECommerceVariationModel, "contents"> & {
            contents?: IPostECommerceVariationContentModel
            alternates?: IPostAlternateService[]
        })[]
    })
    components?: IPostModel["components"]
} & Omit<IPostGetOneResultService, "eCommerce"|"components">

export interface IPostGetPrevNextResultService {
    _id: string
    contents?: IPostContentModel
    createdAt: string
}

export interface IPostGetWithURLParamService {
    typeId: PostTypeId,
    url: string
    pageTypeId?: PageTypeId
    langId?: string
    statusId?: StatusId
}

export interface IPostGetManyParamService {
    _id?: string[]
    sortTypeId?: PostSortTypeId
    typeId?: PostTypeId[],
    pageTypeId?: PageTypeId[]
    langId?: string
    statusId?: StatusId,
    count?: number,
    page?: number
    ignorePostId?: string[]
    title?: string
    authorId?: string
    categories?: string[]
    tags?: string[]
}

export interface IPostGetPrevNextParamService {
    _id: string
    typeId: PostTypeId,
    statusId?: StatusId
    langId?: string
    categories?: string[]
    tags?: string[]
    authorId?: string
}

export interface IPostGetCountParamService {
    typeId: PostTypeId
    statusId?: StatusId
    title?: string
    categories?: string[]
    authorId?: string
}

export type IPostUpdateViewWithIdParamService = {
    _id: string,
    typeId: PostTypeId
    langId?: string
}