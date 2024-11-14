import { LanguageService } from '@services/language.service';
import { StatusId } from '@constants/status';
import { LanguageUtil } from '@utils/language.util';
import { CookieSSRUtil } from '@utils/cookie.ssr.util';
import { UrlUtil } from '@utils/url.util';
import { IncomingMessage, ServerResponse } from 'http';
import { UrlSSRUtil } from '@utils/url.ssr.util';

const init = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  // Get all languages
  req.appData.languages =
    (await LanguageService.getMany({ statusId: StatusId.Active })).data ?? [];

  // Find default language
  const foundDefaultLanguage = req.appData.languages.findSingle(
    'isDefault',
    true
  );
  if (foundDefaultLanguage) {
    req.appData.defaultLangId = foundDefaultLanguage._id;
    req.appData.selectedLangId = foundDefaultLanguage._id;
    req.appData.selectedLangCode = LanguageUtil.getCode(foundDefaultLanguage);

    if (!req.pageData.isSitemap) {
      // Check is there a cookie lang code
      if (req.cookies.langCode) {
        // Check cookie lang code and default lang code are same
        if (req.appData.selectedLangCode == req.cookies.langCode) {
          CookieSSRUtil.deleteLangId(req, res);
          UrlSSRUtil.move(
            res,
            UrlUtil.replaceLanguageCode({
              url: req.getURL,
              withBase: true,
            })
          );
          return false;
        } else {
          // Find cookie lang code
          const langKeys = req.cookies.langCode.split('-');
          const foundCookieLanguagesWithKey = req.appData.languages.findMulti(
            'shortKey',
            langKeys[0]
          );
          const foundCookieLanguageWithLocale =
            foundCookieLanguagesWithKey.findSingle('locale', langKeys[1]);
          // Check lang code is correct
          if (foundCookieLanguageWithLocale) {
            req.appData.selectedLangId = foundCookieLanguageWithLocale._id;
            req.appData.selectedLangCode = req.cookies.langCode;
            if (req.cookies.langId != req.appData.selectedLangId) {
              CookieSSRUtil.setLangId(req, res);
            }
          } else {
            UrlSSRUtil.move(
              res,
              UrlUtil.replaceLanguageCode({
                url: req.getURL,
                withBase: true,
              })
            );
            return false;
          }
        }
      } else {
        // Check there is a cookie lang id and check it is same with default lang id
        if (
          req.cookies.langId &&
          req.cookies.langId != req.appData.selectedLangId
        ) {
          const foundCookieLanguageWithId = req.appData.languages.findSingle(
            '_id',
            req.cookies.langId
          );
          if (foundCookieLanguageWithId) {
            UrlSSRUtil.move(
              res,
              UrlUtil.replaceLanguageCode({
                url: req.getURL,
                newLanguage: foundCookieLanguageWithId,
                withBase: true,
              })
            );
            return false;
          }
        }
      }
    }
  } else {
    res.writeHead(
      409,
      "Default language couldn't find. Please add a default language"
    );
    res.end();
    return false;
  }

  return true;
};

export const LanguageSSRUtil = {
  init: init,
};
