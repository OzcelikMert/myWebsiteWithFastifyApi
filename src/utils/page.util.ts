import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {IncomingMessage} from "http";
import {PostService} from "services/post.service";
import {ViewService} from "services/view.service";
import {IPageGetParamUtil} from "types/utils/page.util";
import {PostTermService} from "services/postTerm.service";
import {PostTermTypeId} from "constants/postTermTypes";
import {ComponentKey} from "constants/componentKeys";
import {lastBlogsPerPageBlogCount} from "components/theme/lastBlogs";

const initProps = async(params: IPageGetParamUtil) => {
    let serviceResult = await PostService.getWithURL({
        langId: params.req.appData.selectedLangId,
        typeId: PostTypeId.Page,
        statusId: StatusId.Active,
        url: params.url ?? "",
        ...(params.typeId ? {pageTypeId: params.typeId} : {})
    });

    if(serviceResult.status && serviceResult.data){
        params.req.pageData.page = serviceResult.data;

        if(params.increaseView){
            await PostService.updateViewWithId({
                _id: serviceResult.data._id,
                typeId: serviceResult.data.typeId,
                langId: params.req.appData.selectedLangId ?? ""
            });

            await ViewService.add({
                url: params.req.getURL.asPath,
                langId: params.req.appData.selectedLangId ?? ""
            });
        }

        if(serviceResult.data.components){
            await initComponentProps(params.req);
        }
    }
}

const initComponentProps = async (req: IncomingMessage) => {
    if(req.pageData.page){
        for (const component of req.pageData.page.components ?? []) {
            switch (component.elementId) {
                case ComponentKey.HotCategories:
                    req.pageData.categories = (await PostTermService.getMany({
                        langId: req.appData.selectedLangId,
                        typeId: [PostTermTypeId.Category],
                        postTypeId: PostTypeId.Blog,
                        statusId: StatusId.Active
                    })).data;
                    break;
                case ComponentKey.LastBlogs:
                    req.pageData.lastBlogs = (await PostService.getMany({
                        langId: req.appData.selectedLangId,
                        typeId: [PostTypeId.Blog],
                        statusId: StatusId.Active,
                        count: lastBlogsPerPageBlogCount,
                        page: 1
                    })).data;
                    req.pageData.maxBlogCount = (await PostService.getCount({
                        typeId: PostTypeId.Blog,
                        statusId: StatusId.Active,
                    })).data;
                    break;
            }
        }
    }
}

const getCommonProps = (req: IncomingMessage) =>  {
    return {
        appData: req.appData,
        pageData: req.pageData ?? {},
        cookies: req.cookies ?? {},
        getURL: req.getURL
    }
}

export const PageUtil = {
    initProps: initProps,
    getCommonProps: getCommonProps
}