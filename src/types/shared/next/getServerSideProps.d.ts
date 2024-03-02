import {PagePropCommonDocument} from "types/pageProps";

export interface GetServerSidePropsDocument<T> {
    props: {
        pageData:  PagePropCommonDocument<{}>["pageData"]
    }
}