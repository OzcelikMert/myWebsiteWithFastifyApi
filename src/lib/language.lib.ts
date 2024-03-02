import {IncomingMessage, ServerResponse} from "http";
import languageService from "services/language.service";
import linkUtil from "utils/link.util";
import {StatusId} from "constants/status";

export default {
    async get(req: IncomingMessage) {
        req.appData.languages = [];
        let resData = (await languageService.getMany({
            statusId: StatusId.Active
        }));

        if (resData.status && resData.data) {
            req.appData.languages = resData.data;
        }
    },
    check(req: IncomingMessage, res: ServerResponse<IncomingMessage>, langKey: string) {
        let languages = req.appData.languages.findMulti("shortKey", langKey.removeLastChar(3));
        let language = languages.findSingle("locale", langKey.slice(3));

        if (language) {
            req.appData.languageId = language._id;
            req.appData.languageKeyWithLocale = linkUtil.language(language);
        } else {
            res.writeHead(404, {
                Location: "/404"
            })
            return true;
        }
        return false;
    },
    isDefault(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
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
    },
    checkCookie(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        if (req.appData.cookies.languageId) {
            if (req.appData.settings.defaultLangId != req.appData.cookies.languageId) {
                const language = req.appData.languages.findSingle("_id", req.appData.cookies.languageId);
                if (language) {
                    res.writeHead(302, {
                        Location: req.appData.apiPath.website.full.replace(
                            req.appData.apiPath.website.base,
                            `${req.appData.apiPath.website.base}/${linkUtil.language(language)}`
                        )
                    })
                    res.end();
                    return true;
                }
            }
        }
        return false;
    }
}