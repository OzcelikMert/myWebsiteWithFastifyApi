import { PostTypeId } from '@constants/postTypes';
import { StatusId } from '@constants/status';
import { IncomingMessage } from 'http';
import { PostService } from '@services/post.service';
import { IPageGetParamUtil } from 'types/utils/page.util';
import { ComponentService } from '@services/component.service';
import { ComponentTypeId } from '@constants/componentTypes';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';

const init = async (params: IPageGetParamUtil) => {
  const serviceResultPage = await PostService.getWithURL({
    langId: params.req.appData.selectedLangId,
    typeId: PostTypeId.Page,
    statusId: StatusId.Active,
    url: params.url ?? '',
    ...(params.typeId ? { pageTypeId: params.typeId } : {}),
  });

  if (serviceResultPage.status && serviceResultPage.data) {
    params.req.pageData.page = serviceResultPage.data;

    if (params.increaseView) {
      await PostService.updateViewWithId({
        _id: serviceResultPage.data._id,
        typeId: serviceResultPage.data.typeId,
        langId: params.req.appData.selectedLangId ?? '',
        url: params.url,
      });
    }

    if (
      serviceResultPage.data.components &&
      serviceResultPage.data.components.length > 0
    ) {
      await initPrivateComponents(params.req);
    }
  }
};

const initPrivateComponents = async (req: IncomingMessage) => {
  req.pageData.privateComponents = [];

  if (req.pageData.page && req.pageData.page.components) {
    const serviceResult = await ComponentService.getMany({
      langId: req.appData.selectedLangId,
      typeId: ComponentTypeId.Private,
      withContent: true,
      withCustomSort: true,
      _id: req.pageData.page.components,
    });

    if (serviceResult.status && serviceResult.data) {
      req.pageData.privateComponents = serviceResult.data;
      await initComponentSSRProps(req, req.pageData.privateComponents);
    }
  }
};

const initPublicComponents = async (req: IncomingMessage) => {
  req.pageData.publicComponents = [];

  const serviceResult = await ComponentService.getMany({
    langId: req.appData.selectedLangId,
    typeId: ComponentTypeId.Public,
    withContent: true,
  });

  if (serviceResult.status && serviceResult.data) {
    req.pageData.publicComponents = serviceResult.data;
    await initComponentSSRProps(req, req.pageData.publicComponents);
  }
};

const initComponentSSRProps = async (
  req: IncomingMessage,
  components: IComponentGetResultService[]
) => {
  for (const component of components ?? []) {
    try {
      const componentClass = (await import(`components/theme/${component.key}`))
        .default as typeof ComponentHelperClass;
      if (componentClass.initComponentServerSideProps) {
        await componentClass.initComponentServerSideProps(req, component);
      }
    } catch (e) {}
  }
};

const getProps = (req: IncomingMessage) => {
  return {
    appData: req.appData,
    pageData: req.pageData ?? {},
    cookies: req.cookies ?? {},
    getURL: req.getURL,
  };
};

export const PageSSRUtil = {
  init: init,
  getProps: getProps,
  initPublicComponents: initPublicComponents,
};
