import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "@utils/page.util";
import {PageTypeId} from "@constants/pageTypes";
import {PostService} from "@services/post.service";
import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import {IPostGetOneResultService} from "types/services/post.service";
import HTMLReactParser from "html-react-parser";

type PageState = {};

type PageProps = {} & IPagePropCommon<{blog?: IPostGetOneResultService}>;

export default class PageBlogURL extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div className="page page-blog">
                <section className="blog-section">
                    <div className="container">
                        {this.props.pageData.blog?.contents?.content ? (HTMLReactParser(this.props.pageData.blog?.contents?.content || "")) : null}
                    </div>
                </section>
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;
    let res = context.res;

    let url = context.params?.url as string || "";

    let serviceResultBlog = await PostService.getWithURL({
        url: url,
        typeId: PostTypeId.Blog,
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active
    });

    await PageUtil.initProps({req: req,
        url: "blog",
        typeId: PageTypeId.Blog,
        increaseView: true,
        force404: !serviceResultBlog.status || !serviceResultBlog.data
    });

    if(req.pageData.page && req.pageData.page.pageTypeId == PageTypeId.Blog){
        if(serviceResultBlog.status && serviceResultBlog.data){
            req.pageData.blog = serviceResultBlog.data;
            req.pageData.page.isNoIndex = false;

            await PostService.updateViewWithId({
                _id: serviceResultBlog.data._id,
                typeId: serviceResultBlog.data.typeId,
                langId: req.appData.selectedLangId
            });

            if(serviceResultBlog.data.tags && serviceResultBlog.data.tags.length > 0){
                req.pageData.page.tags = serviceResultBlog.data.tags;
            }

            if(req.pageData.page.contents && serviceResultBlog.data.contents){
                req.pageData.page.contents.title = `${req.pageData.page.contents.title} - ${serviceResultBlog.data.contents.title}`;
            }
        }
    }

    return {
        props: PageUtil.getCommonProps(req),
    };
}