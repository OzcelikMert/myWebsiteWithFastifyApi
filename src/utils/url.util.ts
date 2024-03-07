import {IncomingMessage, ServerResponse} from "http";
import absoluteUrl from "next-absolute-url";
import {IGetURL} from "types/pageProps";
import {ILanguageGetResultService} from "types/services/language.service";
import {LanguageUtil} from "utils/language.util";

const get = (req: IncomingMessage) : IGetURL => {
    let paths = absoluteUrl(req);

    return {
        full: `${paths.protocol}//${paths.host}${req.url !== "/" ? `${req.url}` : ""}`.replace(/\/$/, ""),
        base: `${paths.protocol}//${paths.host}`,
        asPath: req.url !== "/" ? `${req.url}` : ""
    }
}

const move = (res: ServerResponse<IncomingMessage>, newURL: string) => {
    res.writeHead(302, {
        Location: newURL
    });
    return res.end();
}

const replaceLanguageCode = (params: {url: IGetURL, newLanguage?: ILanguageGetResultService, withBase?: boolean}) => {
    let replacedURL = "";
    let newAsPath = "";

    if(params.url.asPath){
        let langCodeFromURL = getLanguageCode(params.url.asPath);
        if(langCodeFromURL){
            newAsPath = params.url.asPath.replace(`/${langCodeFromURL}`, "");
        }
    }

    if(params.newLanguage){
        newAsPath = `/${LanguageUtil.getCode(params.newLanguage)}${newAsPath}`;
    }

    if(params.withBase){
        replacedURL = params.url.base + newAsPath;
    }else {
        replacedURL = newAsPath;
    }

    return replacedURL;
}

const getLanguageCode = (url: string) : string | null => {
    let langCode = null;

    let langMatches = url.match(/\/([a-z]{2}\-[a-z]{2})/gm);
    if (langMatches && langMatches.length > 0) {
        let urlLang = langMatches[0];
        langCode = urlLang.replace("/", "");
    }

    return langCode;
}

export const URLUtil = {
    get: get,
    move: move,
    replaceLanguageCode: replaceLanguageCode,
    getLanguageCode: getLanguageCode
};