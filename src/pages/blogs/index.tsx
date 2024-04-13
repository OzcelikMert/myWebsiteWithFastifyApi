import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import {PageUtil} from "@utils/page.util";
import {IPagePropCommon} from "types/pageProps";
import {PageTypeId} from "@constants/pageTypes";
import ComponentThemeSelectedComponents from "@components/theme/selectedComponents";
import ComponentAppLayout from "@components/app/layout";
import {PostTermService} from "@services/postTerm.service";
import {PostTermTypeId} from "@constants/postTermTypes";
import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import {IPostTermGetResultService} from "types/services/postTerm.service";

export interface IBlogsPagePropsParams {
    search?: string
    page: number
}

type PageState = {};

type PageProps = {} & IPagePropCommon<{
    category?: IPostTermGetResultService
    params: IBlogsPagePropsParams
}>;

export default class PageBlogs extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    getPageTitle() {
        let title: string = this.props.pageData.category
            ? this.props.pageData.category.contents?.title
            : this.props.pageData.params.search ?? "";

        if(this.props.pageData.params.page > 1){
            title = `${title.length > 0 ? "- " : ""}${this.props.pageData.params.page}`;
        }

        return `${this.props.pageData.page?.contents?.title} ${title.length > 0 ? `- ${title}` : ""}`;
    }

    render() {
        return (
            <ComponentAppLayout {...this.props} pageTitle={this.getPageTitle()}>
                <div className="page page-blogs">
                    <section className="page-blogs">
                        <div className="container">
                            <ComponentThemeSelectedComponents {...this.props} />
                        </div>
                    </section>
                </div>
            </ComponentAppLayout>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;
    req.pageData.params = {};

    let page = Number(context.params?.page ?? 1) || 1;
    let search = decodeURI(context.params?.search as string || "");
    let categoryURL = context.params?.category as string || null;
    let categoryId = "";
    req.pageData.params.search = search;
    req.pageData.params.page = page;
    req.pageData.params.categoryURL = categoryURL;

    if(categoryURL){
        let serviceResultCategory = await PostTermService.getWithURL({
            typeId: PostTermTypeId.Category,
            postTypeId: PostTypeId.Blog,
            langId: req.appData.selectedLangId,
            statusId: StatusId.Active,
            url: categoryURL
        });

        if(serviceResultCategory.status && serviceResultCategory.data){
            req.pageData.category = serviceResultCategory.data;
            categoryId = serviceResultCategory.data._id;
        }
    }

    await PageUtil.initProps({
        req: req,
        url: "blogs",
        typeId: PageTypeId.Blogs,
        increaseView: true
    });

    if (req.pageData.page && req.pageData.page.pageTypeId == PageTypeId.Blogs) {

    }

    return {
        props: PageUtil.getCommonProps(req),
    };
}
