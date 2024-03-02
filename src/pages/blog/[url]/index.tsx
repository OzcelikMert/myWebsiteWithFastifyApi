import {PagePropCommonDocument} from "types/pageProps";
import {PostGetOneResultDocument} from "types/services/post";
import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import HTMLReactParser from "html-react-parser";
import SelectedComponents from "components/selectedComponents";
import postService from "services/post.service";
import {PageTypeId, PostTermTypeId, PostTypeId, StatusId} from "constants/index";
import viewLib from "lib/view.lib";
import pageLib from "lib/page.lib";
import ThemeWidgetSearch from "components/theme/widgets/search";
import PagePaths from "constants/pagePaths";
import ThemeWidgetCategories from "components/theme/widgets/categories";
import {PostTermGetResultDocument} from "types/services/postTerm";
import postTermService from "services/postTerm.service";
import ComponentError404 from "components/error/404";
import ComponentPageHeader from "components/tools/pageHeader";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{
    blog: PostGetOneResultDocument
    categories: PostTermGetResultDocument[]
}>;

export default class PageBlogURL extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        if(!this.props.themeData.blog){
            return <ComponentError404 appData={this.props.appData}/> ;
        }

        return (
            <div className="page page-blog">
                <ComponentPageHeader title={`${this.props.pageData?.contents?.title} - ${this.props.themeData.blog.contents?.title}`} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            {this.props.themeData.blog?.contents?.content ? (HTMLReactParser(this.props.themeData.blog?.contents?.content || "")) : null}
                            <SelectedComponents {...this.props} />
                        </div>
                        <div className="col-md-4">
                            <ThemeWidgetSearch appData={this.props.appData} pagePath={PagePaths.blogs()}/>
                            <ThemeWidgetCategories items={this.props.themeData.categories} appData={this.props.appData}
                                                   pagePath={PagePaths.blogs()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    await pageLib.get(req, "", PageTypeId.Blogs, false);

    let blog = (
        await postService.getOne({
            langId: req.appData.languageId,
            typeId: PostTypeId.Blog,
            url: (context.params?.url ?? "") as string,
            statusId: StatusId.Active,
        })
    ).data;

    if (blog) {
        req.themeData.blog = blog;

        await viewLib.set(req, blog._id, blog.typeId);

        req.themeData.categories = (
            await postTermService.getMany({
                langId: req.appData.languageId,
                postTypeId: PostTypeId.Blog,
                typeId: [PostTermTypeId.Category],
                statusId: StatusId.Active,
                withPostCount: true
            })
        ).data;
    }

    return {
        props: pageLib.getReturnData(req),
    };
}
