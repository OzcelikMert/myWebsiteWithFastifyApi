import absoluteUrl from "next-absolute-url";
import {IncomingMessage} from "http";

let api = `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ""}`;

const getApiURL = () => { return api; }

const getImageURL = () => { return `${getApiURL()}/uploads/images/`; }

const getFlagURL = () => { return `${getApiURL()}/uploads/flags/`; }

const createPath = (...paths: (number | string | undefined)[]) => {
    let returnPath = "";
    for (let path of paths) {
        if (path) {
            if (
                typeof path === "string" &&
                path.length > 0 &&
                path.startsWith("/")
            ) {
                path = path.slice(1);
            }

            returnPath += `/${path.toString()}`;
        }
    }
    return returnPath;
}

const set = (req: IncomingMessage) => {
    let paths = absoluteUrl(req);

    req.appData.apiPath = {
        ...req.appData.apiPath,
        website: {
            full: `${paths.protocol}//${paths.host}${req.url !== "/" ? `${req.url}` : ""}`.replace(/\/$/, ""),
            base: `${paths.protocol}//${paths.host}`,
            originalUrl: req.url !== "/" ? `${req.url}` : ""
        }
    }
}

export const PathUtil = {
    set: set,
    getApiURL: getApiURL,
    getImageURL: getImageURL,
    getFlagURL: getFlagURL,
    createPath: createPath
}