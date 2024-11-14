import { ILanguageGetResultService } from 'types/services/language.service';

const getCode = (
  language: ILanguageGetResultService,
  splitKey = '-',
  isLocaleUpperCase: boolean = false
) => {
  return `${language.shortKey}${splitKey}${isLocaleUpperCase ? language.locale.toUpperCase() : language.locale}`;
};

const splitLangCode = (langCode: string) => {
  const langKeys = langCode.split('-');
  const shortKey = langKeys[0];
  const locale = langKeys[1];

  return {
    shortKey: shortKey,
    locale: locale,
  };
};

export const LanguageUtil = {
  getCode: getCode,
  splitLangCode: splitLangCode,
};
