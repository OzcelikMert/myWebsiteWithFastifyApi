import {ILanguageGetResultService} from "types/services/language.service";

const getCode = (language: ILanguageGetResultService, splitKey = "-", isLocaleUpperCase: boolean = false) => {
    return `${language.shortKey}${splitKey}${isLocaleUpperCase ? language.locale.toUpperCase() : language.locale}`;
}

export const LanguageUtil = {
    getCode: getCode,
}