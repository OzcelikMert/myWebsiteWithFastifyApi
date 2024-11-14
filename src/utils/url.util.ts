import { IGetURL } from 'types/pageProps';
import { ILanguageGetResultService } from 'types/services/language.service';
import { LanguageUtil } from '@utils/language.util';

const replaceLanguageCode = (params: {
  url: IGetURL;
  newLanguage?: ILanguageGetResultService;
  withBase?: boolean;
}) => {
  let replacedURL = '';

  if (params.url.asPath) {
    replacedURL = params.url.asPath;
    const langCodeFromURL = getLanguageCode(params.url.asPath);
    if (langCodeFromURL) {
      replacedURL = replacedURL.replace(`/${langCodeFromURL}`, '');
    }
  }

  if (params.newLanguage) {
    replacedURL = `/${LanguageUtil.getCode(params.newLanguage)}${replacedURL}`;
  }

  if (params.withBase) {
    replacedURL = params.url.base + replacedURL;
  }

  return replacedURL || '/';
};

const getLanguageCode = (url: string): string | null => {
  let langCode = null;

  const langMatches = url.match(/\/([a-z]{2}\-[a-z]{2})/gm);
  if (langMatches && langMatches.length > 0) {
    const urlLang = langMatches[0];
    langCode = urlLang.replace('/', '');
  }

  return langCode;
};

const createHref = (params: {
  url: IGetURL;
  targetPath?: string;
  withAsPath?: boolean;
  withBase?: boolean;
}) => {
  let newHref = '';

  const langCodeFromURL = getLanguageCode(params.url.asPath);
  if (langCodeFromURL) {
    newHref = `/${langCodeFromURL}`;
  }

  if (params.withAsPath && params.url.asPath) {
    newHref = params.url.asPath;
  }

  if (params.withBase) {
    newHref = params.url.base + newHref;
  }

  if (params.targetPath) {
    newHref +=
      `${params.targetPath.startsWith('/') ? '' : '/'}` + params.targetPath;
  }

  return newHref || '/';
};

export const UrlUtil = {
  replaceLanguageCode: replaceLanguageCode,
  getLanguageCode: getLanguageCode,
  createHref: createHref,
};
