import { IPagePropCommon } from 'types/pageProps';

export interface GetServerSidePropsDocument<T> {
  props: {
    pageData: IPagePropCommon['pageData'];
  };
}
