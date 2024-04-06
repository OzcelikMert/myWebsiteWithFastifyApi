import {ILanguageGetResultService} from "types/services/language.service";

const getCode = (language: ILanguageGetResultService, splitKey = "-", isLocaleUpperCase: boolean = false) => {
    return `${language.shortKey}${splitKey}${isLocaleUpperCase ? language.locale.toUpperCase() : language.locale}`;
}

const splitLangCode = (langCode: string) => {
    let langKeys = langCode.split("-");
    let shortKey = langKeys[0];
    let locale = langKeys[1];

    return {
        shortKey: shortKey,
        locale: locale
    };
}


export const LanguageUtil = {
    getCode: getCode,
    splitLangCode: splitLangCode
}