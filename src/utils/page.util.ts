import {PageTypeId} from "constants/pageTypes";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import viewLib from "utils/view.util";
import {IncomingMessage} from "http";
import {PostService} from "services/post.service";
import {IPagePropCommon} from "types/pageProps";

const get = async(req: IncomingMessage, url?: string, typeId?: PageTypeId, isSetView = true) => {
    req.pageData = {};

    let resData = await PostService.getWithURL({
        langId: req.appData.languageId,
        typeId: PostTypeId.Page,
        statusId: StatusId.Active,
        url: url ?? "",
        ...(typeId ? {pageTypeId: typeId} : {})
    });

    if(resData.status && resData.data){
        req.pageData.page = resData.data;

        if(isSetView){
            await viewLib.set(req, resData.data._id, resData.data.typeId);
        }
    }
}

const getReturnData = (req: IncomingMessage) : Omit<IPagePropCommon, "router"|"t"|"cookies"> =>  {
    return {
        appData: req.appData,
        navigations: req.navigations,
        pageData: req.pageData
    }
}

export const PageUtil = {
    get: get,
    getReturnData: getReturnData
}