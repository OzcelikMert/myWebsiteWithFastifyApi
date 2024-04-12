import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import {PageUtil} from "@utils/page.util";
import {IPagePropCommon} from "types/pageProps";
import {PageTypeId} from "@constants/pageTypes";

type PageState = {};

type PageProps = {} & IPagePropCommon;

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

    await PageUtil.initProps({req: req,
        url: "blogs",
        typeId: PageTypeId.Blogs,
        increaseView: true
    });

    if(req.pageData.page && req.pageData.page.pageTypeId == PageTypeId.Blogs){
        let page: number = Number(context.params?.page ?? 1) || 1;
        let search: string = context.params?.search as string || "";
        let categoryUrl: string = context.params?.category as string || "";

        console.log(page, search, categoryUrl);
    }

    return {
        props: PageUtil.getCommonProps(req),
    };
}
