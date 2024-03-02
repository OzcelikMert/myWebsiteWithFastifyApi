import {NextRouter} from "next/dist/shared/lib/router/router";
import {PostGetOneResultDocument} from "types/services/post";
import {SettingGetResultDocument} from "types/services/setting";
import {LanguageGetResultDocument} from "types/services/language";
import {ComponentGetResultDocument} from "types/services/component";
import { NavigationGetResultDocument } from "types/services/navigation";

export interface PagePropCommonDocument<T> {
    appData: AppDataDocument
    themeData: ThemeDataDocument & T
    pageData?: PostGetOneResultDocument | null
    router: NextRouter,
}

export interface ThemeDataDocument {
    navigations: NavigationGetResultDocument[]
    footer?: ComponentGetResultDocument
    [key: string]: any
}

export interface AppDataDocument {
    settings: SettingGetResultDocument,
    languages: LanguageGetResultDocument[],
    languageId: string
    languageKeyWithLocale?: string
    cookies: {
        languageId: string
    }
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