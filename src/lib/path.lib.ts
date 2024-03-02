import pathUtil from "utils/path.util";
import absoluteUrl from "next-absolute-url";
import {IncomingMessage} from "http";

export default {
    set(req: IncomingMessage){
        let paths = absoluteUrl(req);

        req.appData.apiPath = {
            website: {
                full: `${paths.protocol}//${paths.host}${req.url !== "/" ? `${req.url}` : ""}`.replace(/\/$/, ""),
                base: `${paths.protocol}//${paths.host}`,
                originalUrl: req.url !== "/" ? `${req.url}` : ""
            },
            ...pathUtil
        }
    },
}