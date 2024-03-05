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
    navigations?: INavigationGetResultService[]
    cookies: {} & { [key: string]: any }
}

export interface IAppData {
    settings: ISettingGetResultService,
    languages: ILanguageGetResultService[],
    languageId: string
    languageKeyWithLocale?: string
    apiPath: {
        website: {
            full: string,
            base: string,
            originalUrl: string
        }
        api: string
        uploads: {
            images: string,
            flags: string,
            static: string
        }
    }
}

export type IPageData<T> = {
    page?: IPostGetOneResultService,
} & T