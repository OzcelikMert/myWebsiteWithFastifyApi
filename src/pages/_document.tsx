import React, {Component} from "react";
import {Html, Head, Main, NextScript} from 'next/document'
import {NEXT_DATA} from "next/dist/shared/lib/utils";
import {IPagePropCommon} from "types/pageProps";
import {LinkUtil} from "utils/link.util";

type PageState = {};

type PageProps = {
    __NEXT_DATA__: (Omit<NEXT_DATA, "props"> & { props: { pageProps: IPagePropCommon<{}> } })
};

export default class HTMLDocument extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        let appData = this.props.__NEXT_DATA__.props.pageProps.appData;
        let language = appData.languages.findSingle("_id", appData.languageId);
        return (
            <Html lang={language ? LinkUtil.languageUpperLocale(language) : ""}>
                <Head/>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}