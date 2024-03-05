import {IncomingMessage, ServerResponse} from "http";
import {setCookie} from "cookies-next";

/*const set = (req: IncomingMessage) => {
    req.cookies = {
        ...req.appData.cookies,
        ...req.cookies
    };
}*/

const setLanguageId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    setCookie("languageId", req.appData.languageId, {req, res,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        path: "/"
    })
}

export const CookieUtil = {
    setLanguageId: setLanguageId
};