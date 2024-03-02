import {PageTypeId} from "constants/pageTypes";
import postService from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import viewLib from "lib/view.lib";
import themeLib from "lib/theme.lib";
import {IncomingMessage} from "http";
import {PagePropCommonDocument} from "types/pageProps";

export default {
    async get(req: IncomingMessage, url?: string, typeId?: PageTypeId, isSetView = true) {
        req.pageData = null;

        let resData = (await postService.getOne({
            langId: req.appData.languageId,
            typeId: PostTypeId.Page,
            statusId: StatusId.Active,
            ...(url ? {url: url} : {}),
            ...(typeId ? {pageTypeId: typeId} : {})
        }));

        if(resData.status && resData.data){
            req.pageData = resData.data;

            if(isSetView){
                await viewLib.set(req, req.pageData._id, req.pageData.typeId);
            }

            await themeLib.getThemeDataForComponents(req);
        }
    },
    getReturnData(req: IncomingMessage) : Omit<PagePropCommonDocument<{}>, "router"> {
        return {
            appData: req.appData,
            themeData: req.themeData,
            pageData: req.pageData
        }
    }
}