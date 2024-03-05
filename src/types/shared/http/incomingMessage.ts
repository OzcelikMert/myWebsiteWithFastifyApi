import {IPagePropCommon} from "types/pageProps";

declare module "http" {
    interface IncomingMessage {
        appData: IPagePropCommon["appData"]
        pageData: IPagePropCommon["pageData"]
        navigations?: IPagePropCommon["navigations"]
        cookies: IPagePropCommon["cookies"]
    }
}