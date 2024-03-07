import {AppProps} from "next/app";
import {ILanguageKeys} from "types/constants/languageKeys";
import {INavigationGetResultService} from "types/services/navigation.service";
import {IPostGetOneResultService} from "types/services/post.service";
import {ISettingGetResultService} from "types/services/setting.service";
import {ILanguageGetResultService} from "types/services/language.service";

export type IPagePropCommon<T = {[key: string]: any}> = {
    router: AppProps["router"],
    t: (key: ILanguageKeys) => string
    appData: IAppData
    pageData: IPageData<T>
    cookies: ICookies
    getURL: IGetURL
}

export interface IAppData {
    navigations: INavigationGetResultService[]
    settings: ISettingGetResultService,
    languages: ILanguageGetResultService[],
    selectedLangId: string
    selectedLangCode: string
    defaultLangId: string
}

export type IPageData<T> = {
    page?: IPostGetOneResultService,
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