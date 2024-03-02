import {AppDataDocument, PagePropCommonDocument} from "types/pageProps";

declare module "http" {
    interface IncomingMessage {
        appData: PagePropCommonDocument<{}>["appData"]
        pageData:  PagePropCommonDocument<{}>["pageData"]
        themeData: PagePropCommonDocument<{}>["themeData"]
        get cookies(): Partial<{
            [key: string]: string;
        }>;
    }
}