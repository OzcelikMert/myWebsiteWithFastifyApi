import {IncomingMessage, ServerResponse} from "http";
import {setCookie} from "cookies-next";

export default {
    set(req: IncomingMessage) {
        req.appData.cookies = {
            ...req.appData.cookies,
            ...req.cookies
        };
    },
    setLanguageId(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        setCookie("languageId", req.appData.languageId, {req, res,
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            path: "/"
        })
    }
};