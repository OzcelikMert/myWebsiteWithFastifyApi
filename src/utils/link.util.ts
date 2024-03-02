import {LanguageGetResultDocument} from "types/services/language";
import {AppDataDocument} from "types/pageProps";

export default {
    home(data: AppDataDocument) {
        return data.apiPath.website.base;
    },
    language(language: LanguageGetResultDocument) {
        return `${language.shortKey}-${language.locale}`;
    },
    languageUpperLocale(language: LanguageGetResultDocument) {
        return `${language.shortKey}_${language.locale.toUpperCase()}`;
    },
    target(data: AppDataDocument, target: string) {
        let path = `${data.apiPath.website.base}`;

        if(data.languageId != data.settings.defaultLangId){
            const language = data.languages.findSingle("_id", data.languageId);
            if (language) {
                path = `${data.apiPath.website.base}/${this.language(language)}`;
            }
        }

        if (
            target.search("/") > -1 ||
            (target.search("/") === -1 && target.search("#") === -1)
        ) {
            target = `/${target.startsWith("/") ? target.slice(1) : target}`;
        }

        return `${path}${target}`;
    },
    changeLanguage(appData: AppDataDocument, language: LanguageGetResultDocument) {
        let path = "";
        if(appData.languageId != appData.settings.defaultLangId) {
          path = appData.apiPath.website.full.replace(appData.languageKeyWithLocale ?? "", this.language(language))
        } else {
            path = `${appData.apiPath.website.base}/${this.language(language)}${appData.apiPath.website.originalUrl}`.replace(/\/$/, "");
        }
        return path;
    }
}