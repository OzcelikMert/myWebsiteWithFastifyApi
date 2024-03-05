import {PostTermTypeId} from "../../constants/postTermTypes";
import {PostTypeId} from "../../constants/postTypes";
import {PageTypeId} from "../../constants/pageTypes";

export interface ISitemapGetPostTermCountResultService {
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    total: number
}

export interface ISitemapGetPostCountResultService {
    typeId: PostTypeId
    total: number
}

export interface ISitemapGetMapsResultService {
    post: ISitemapGetPostCountResultService[]
    postTerm: ISitemapGetPostTermCountResultService[]
}

export interface ISitemapGetPostTermResultService {
    updatedAt: string
    createdAt: string
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    contents: ISitemapContentService[]
}

export interface ISitemapGetPostResultService {
    updatedAt: string
    createdAt: string
    typeId: PostTypeId
    pageTypeId?: PageTypeId
    contents: ISitemapContentService[]
}

export interface ISitemapContentService {
    langId: string
    title: string
    url: string
}

export interface ISitemapGetPostTermParamService {
    typeId: PostTermTypeId
    postTypeId: PostTypeId
    page?: number
}

export interface ISitemapGetPostParamService {
    typeId: PostTypeId
    page?: number
}

export interface ISitemapGetPostTermCountParamService {
    typeId: PostTermTypeId[]
    postTypeId: PostTypeId[]
}

export interface ISitemapGetPostCountParamService {
    typeId: PostTypeId[]
}
