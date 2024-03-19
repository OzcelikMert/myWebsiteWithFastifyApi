import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {IncomingMessage} from "http";
import {PostService} from "services/post.service";
import {ViewService} from "services/view.service";
import {IPageGetParamUtil} from "types/utils/page.util";

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
            try {
                const componentClass = (await import(`components/theme/${component.elementId}`)).default;
                if(componentClass.initServersideProps){
                    await componentClass.initServersideProps(req);
                }
            }catch (e) {}
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