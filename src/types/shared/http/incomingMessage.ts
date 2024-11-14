import { IPagePropCommon } from 'types/pageProps';

declare module 'http' {
  interface IncomingMessage {
    appData: Partial<IPagePropCommon['appData']>;
    pageData: Partial<IPagePropCommon['pageData']>;
    cookies: Partial<IPagePropCommon['cookies']>;
    getURL: IPagePropCommon['getURL'];
  }
}
