import {ILanguageGetResultService} from "types/services/language.service";
import {IAppData} from "types/pageProps";

const home = (data: IAppData) => {
    return data.apiPath.website.base;
}

const languageCode = (language: ILanguageGetResultService) => {
    return `${language.shortKey}-${language.locale}`;
}

const languageUpperLocale = (language: ILanguageGetResultService) => {
    return `${language.shortKey}_${language.locale.toUpperCase()}`;
}

const target = (data: IAppData, target: string) => {
    let path = `${data.apiPath.website.base}`;

    if(data.languageId != data.settings.defaultLangId){
        const language = data.languages.findSingle("_id", data.languageId);
        if (language) {
            path = `${data.apiPath.website.base}/${languageCode(language)}`;
        }
    }

    if (
        target.search("/") > -1 ||
        (target.search("/") === -1 && target.search("#") === -1)
    ) {
        target = `/${target.startsWith("/") ? target.slice(1) : target}`;
    }

    return `${path}${target}`;
}

const changeLanguage = (appData: IAppData, language: ILanguageGetResultService) => {
    let path = "";
    if(appData.languageId != appData.settings.defaultLangId) {
        path = appData.apiPath.website.full.replace(appData.languageKeyWithLocale ?? "", languageCode(language))
    } else {
        path = `${appData.apiPath.website.base}/${languageCode(language)}${appData.apiPath.website.originalUrl}`.replace(/\/$/, "");
    }
    return path;
}

export const LinkUtil = {
    home: home,
    languageCode: languageCode,
    languageUpperLocale: languageUpperLocale,
    target: target,
    changeLanguage: changeLanguage
}