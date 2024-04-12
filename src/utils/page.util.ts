import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import {IncomingMessage} from "http";
import {PostService} from "@services/post.service";
import {IPageGetParamUtil} from "types/utils/page.util";
import {ComponentService} from "@services/component.service";
import {ComponentTypeId} from "@constants/componentTypes";
import {ComponentHelperClass} from "@classes/componentHelper.class";
import {PageTypeId} from "@constants/pageTypes";
import {ApiResult} from "@library/api/result";
import {IPostGetOneResultService} from "types/services/post.service";

const initProps = async (params: IPageGetParamUtil) => {
    let serviceResultPage = new ApiResult<IPostGetOneResultService, any>();

    if(!params.force404){
        serviceResultPage = await PostService.getWithURL({
            langId: params.req.appData.selectedLangId,
            typeId: PostTypeId.Page,
            statusId: StatusId.Active,
            url: params.url ?? "",
            ...(params.typeId ? {pageTypeId: params.typeId} : {})
        });
    }

    if (!serviceResultPage.status || !serviceResultPage.data || params.force404) {
        serviceResultPage = await PostService.getWithURL({
            langId: params.req.appData.selectedLangId,
            typeId: PostTypeId.Page,
            statusId: StatusId.Active,
            pageTypeId: PageTypeId.ErrorPage404,
            url: "404"
        });
    }

    if (serviceResultPage.status && serviceResultPage.data) {
        params.req.pageData.page = serviceResultPage.data;

        if (params.increaseView && serviceResultPage.data.pageTypeId != PageTypeId.ErrorPage404) {
            await PostService.updateViewWithId({
                _id: serviceResultPage.data._id,
                typeId: serviceResultPage.data.typeId,
                langId: params.req.appData.selectedLangId ?? ""
            });
        }

        if (serviceResultPage.data.components) {
            await initThemeComponentProps(params.req);
        }
    }
}

const initThemeComponentProps = async (req: IncomingMessage) => {
    if (req.pageData.page) {
        for (const component of req.pageData.page.components ?? []) {
            try {
                const componentClass = (await import(`components/theme/${component.key}`)).default as typeof ComponentHelperClass;
                if (componentClass.initComponentServersideProps) {
                    await componentClass.initComponentServersideProps(req, component);
                }
            } catch (e) {
            }
        }
    }
}

const initToolComponentProps = async (req: IncomingMessage) => {
    req.appData.toolComponents = [];

    let serviceResult = await ComponentService.getMany({
        langId: req.appData.selectedLangId,
        typeId: ComponentTypeId.Tool,
        withContent: true
    });

    if (serviceResult.status && serviceResult.data) {
        req.appData.toolComponents = serviceResult.data;

        for (const component of req.appData.toolComponents) {
            try {
                const componentClass = (await import(`components/tools/${component.key}`)).default as typeof ComponentHelperClass;
                if (componentClass.initComponentServersideProps) {
                    await componentClass.initComponentServersideProps(req, component);
                }
            } catch (e) {
            }
        }
    }
}

const getCommonProps = (req: IncomingMessage) => {
    return {
        appData: req.appData,
        pageData: req.pageData ?? {},
        cookies: req.cookies ?? {},
        getURL: req.getURL
    }
}

export const PageUtil = {
    initProps: initProps,
    getCommonProps: getCommonProps,
    initToolComponentProps: initToolComponentProps
}