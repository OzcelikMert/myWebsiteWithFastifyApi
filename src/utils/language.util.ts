import {IncomingMessage, ServerResponse} from "http";
import {StatusId} from "constants/status";
import {LanguageService} from "services/language.service";
import {LinkUtil} from "utils/link.util";

const get = async (req: IncomingMessage) => {
    req.appData.languages = [];
    let resData = (await LanguageService.getMany({
        statusId: StatusId.Active
    }));

    if (resData.status && resData.data) {
        req.appData.languages = resData.data;
    }
}

const check = (req: IncomingMessage, res: ServerResponse<IncomingMessage>, langKey: string) => {
    let languages = req.appData.languages.findMulti("shortKey", langKey.removeLastChar(3));
    let language = languages.findSingle("locale", langKey.slice(3));

    if (language) {
        req.appData.languageId = language._id;
        req.appData.languageKeyWithLocale = LinkUtil.languageCode(language);
    } else {
        res.writeHead(404, {
            Location: "/404"
        })
        return true;
    }
    return false;
}

const isDefault = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    if (req.appData.languageId == req.appData.settings.defaultLangId) {
        res.writeHead(302, {
            Location: req.appData.apiPath.website.full.replace(
                `${req.appData.apiPath.website.base}/${req.appData.languageKeyWithLocale}`,
                `${req.appData.apiPath.website.base}`
            )
        })
        res.end();
        return true;
    }
    return false;
}

const checkCookie = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    if (req.cookies.languageId) {
        if (req.appData.settings.defaultLangId != req.cookies.languageId) {
            const language = req.appData.languages.findSingle("_id", req.cookies.languageId);
            if (language) {
                res.writeHead(302, {
                    Location: req.appData.apiPath.website.full.replace(
                        req.appData.apiPath.website.base,
                        `${req.appData.apiPath.website.base}/${LinkUtil.languageCode(language)}`
                    )
                })
                res.end();
                return true;
            }
        }
    }
    return false;
}

export const LanguageUtil = {
    get: get,
    check: check,
    isDefault: isDefault,
    checkCookie: checkCookie
}