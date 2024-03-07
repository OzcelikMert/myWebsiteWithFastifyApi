import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import {PageUtil} from "utils/page.util";
import {IPagePropCommon} from "types/pageProps";

type PageState = {};

type PageProps = {} & IPagePropCommon<{}>;

export default class PageBlogs extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div className="page page-blogs"></div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    return {
        props: PageUtil.getPropCommon(req),
    };
}
