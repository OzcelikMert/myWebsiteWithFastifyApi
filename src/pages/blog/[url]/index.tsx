import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import { IPagePropCommon } from "types/pageProps";
import {PageUtil} from "utils/page.util";

type PageState = {};

type PageProps = {} & IPagePropCommon;

export default class PageBlogURL extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div className="page page-blog">

            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    return {
        props: PageUtil.getCommonProps(req),
    };
}
