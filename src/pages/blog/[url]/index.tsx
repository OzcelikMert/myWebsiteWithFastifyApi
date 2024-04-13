import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "@utils/page.util";
import {PostService} from "@services/post.service";
import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import {IPostGetOneResultService} from "types/services/post.service";
import HTMLReactParser from "html-react-parser";
import ComponentAppLayout from "@components/app/layout";

type PageState = {};

type PageProps = {} & IPagePropCommon<{ blog?: IPostGetOneResultService, url?: string }>;

export default class PageBlogURL extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <ComponentAppLayout {...this.props} pageTitle={`${this.props.t("blog")} - ${this.props.pageData.blog?.contents?.title || this.props.pageData.url}`}>
                <div className="page page-blog">
                    <section className="blog-section">
                        <div className="container">
                            {this.props.pageData.blog?.contents?.content ? (HTMLReactParser(this.props.pageData.blog?.contents?.content || "")) : null}
                        </div>
                    </section>
                </div>
            </ComponentAppLayout>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;
    let res = context.res;

    let url = context.params?.url as string || "";
    req.pageData.url = decodeURI(url);

    let serviceResultBlog = await PostService.getWithURL({
        typeId: PostTypeId.Blog,
        url: url,
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active
    });

    if (serviceResultBlog.status && serviceResultBlog.data) {
        req.pageData.page = {};
        req.pageData.blog = serviceResultBlog.data;

        await PostService.updateViewWithId({
            _id: serviceResultBlog.data._id,
            typeId: serviceResultBlog.data.typeId,
            langId: req.appData.selectedLangId
        });

        if (serviceResultBlog.data.tags && serviceResultBlog.data.tags.length > 0) {
            req.pageData.page.tags = serviceResultBlog.data.tags;
        }
    }

    return {
        props: PageUtil.getCommonProps(req),
    };
}