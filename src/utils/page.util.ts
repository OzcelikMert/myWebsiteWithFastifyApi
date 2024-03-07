import {PageTypeId} from "constants/pageTypes";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {IncomingMessage} from "http";
import {PostService} from "services/post.service";
import {ViewService} from "services/view.service";

const get = async(req: IncomingMessage, url?: string, typeId?: PageTypeId, isSetView = true) => {
    req.pageData = {};

    let resData = await PostService.getWithURL({
        langId: req.appData.selectedLangId,
        typeId: PostTypeId.Page,
        statusId: StatusId.Active,
        url: url ?? "",
        ...(typeId ? {pageTypeId: typeId} : {})
    });

    if(resData.status && resData.data){
        req.pageData.page = resData.data;

        if(isSetView){
            await PostService.updateViewWithId({
                _id: req.pageData.page._id,
                typeId: req.pageData.page.typeId,
                langId: req.appData.selectedLangId ?? ""
            });

            await ViewService.add({
                url: req.getURL.asPath,
                langId: req.appData.selectedLangId ?? ""
            });
        }
    }
}

const getPropCommon = (req: IncomingMessage) =>  {
    return {
        appData: req.appData,
        pageData: req.pageData ?? {},
        cookies: req.cookies ?? {},
        getURL: req.getURL
    }
}

export const PageUtil = {
    get: get,
    getPropCommon: getPropCommon
}