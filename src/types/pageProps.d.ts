import {AppProps} from "next/app";
import {ILanguageKeys} from "types/constants/languageKeys";
import {IPostGetOneResultService} from "types/services/post.service";
import {ISettingGetResultService} from "types/services/setting.service";
import {ILanguageGetResultService} from "types/services/language.service";
import {IComponentGetResultService} from "types/services/component.service";

export type IPagePropCommon<T = {[key: string]: any}> = {
    router: AppProps["router"],
    t: (key: ILanguageKeys) => string
    appData: IAppData
    pageData: IPageData<T>
    cookies: ICookies
    getURL: IGetURL
}

export interface IAppData {
    toolComponents: IComponentGetResultService[]
    settings: ISettingGetResultService,
    languages: ILanguageGetResultService[],
    selectedLangId: string
    selectedLangCode: string
    defaultLangId: string
}

export type IPageData<T> = {
    page?: IPostGetOneResultService | null,
} & T

export interface ICookies {
    langCode?: string
    langId?: string
}

export interface IGetURL {
    full: string,
    base: string,
    asPath: string
}