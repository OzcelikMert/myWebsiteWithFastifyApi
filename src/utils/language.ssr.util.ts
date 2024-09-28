import {LanguageService} from "@services/language.service";
import {StatusId} from "@constants/status";
import {LanguageUtil} from "@utils/language.util";
import {CookieUtil} from "@utils/cookie.util";
import {URLUtil} from "@utils/url.util";
import {IncomingMessage, ServerResponse} from "http";

const init = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    // Get all languages
    req.appData.languages = (await LanguageService.getMany({statusId: StatusId.Active})).data ?? [];

    // Find default language
    let foundDefaultLanguage = req.appData.languages.findSingle("isDefault", true);
    if (foundDefaultLanguage) {
        req.appData.defaultLangId = foundDefaultLanguage._id;
        req.appData.selectedLangId = foundDefaultLanguage._id;
        req.appData.selectedLangCode = LanguageUtil.getCode(foundDefaultLanguage);

        // Check is there a cookie lang code
        if (req.cookies.langCode) {
            // Check cookie lang code and default lang code are same
            if (req.appData.selectedLangCode == req.cookies.langCode) {
                CookieUtil.deleteLangId(req, res);
                URLUtil.move(res, URLUtil.replaceLanguageCode({
                    url: req.getURL,
                    withBase: true
                }));
                return false;
            } else {
                // Find cookie lang code
                let langKeys = req.cookies.langCode.split("-");
                let foundCookieLanguagesWithKey = req.appData.languages.findMulti("shortKey", langKeys[0]);
                let foundCookieLanguageWithLocale = foundCookieLanguagesWithKey.findSingle("locale", langKeys[1]);
                // Check lang code is correct
                if (foundCookieLanguageWithLocale) {
                    req.appData.selectedLangId = foundCookieLanguageWithLocale._id;
                    req.appData.selectedLangCode = req.cookies.langCode;
                    if (req.cookies.langId != req.appData.selectedLangId) {
                        CookieUtil.setLangId(req, res);
                    }
                } else {
                    URLUtil.move(res, URLUtil.replaceLanguageCode({
                        url: req.getURL,
                        withBase: true
                    }));
                    return false;
                }
            }
        } else {
            // Check there is a cookie lang id and check it is same with default lang id
            if (req.cookies.langId && req.cookies.langId != req.appData.selectedLangId) {
                let foundCookieLanguageWithId = req.appData.languages.findSingle("_id", req.cookies.langId);
                if (foundCookieLanguageWithId) {
                    URLUtil.move(res, URLUtil.replaceLanguageCode({
                        url: req.getURL,
                        newLanguage: foundCookieLanguageWithId,
                        withBase: true
                    }));
                    return false;
                }
            }
        }
    }else {
        res.writeHead(409, "Default language couldn't find. Please add a default language");
        res.end();
        return false;
    }

    return true;
}


export const LanguageSSRUtil = {
    init: init
}