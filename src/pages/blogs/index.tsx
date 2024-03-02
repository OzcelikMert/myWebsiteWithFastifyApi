import {PagePropCommonDocument} from "types/pageProps";
import {PostGetManyResultDocument} from "types/services/post";
import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import postService from "services/post.service";
import {PageTypeId, PostTermTypeId, PostTypeId, StatusId} from "constants/index";
import pageLib from "lib/page.lib";
import Image from "next/image";
import imageSourceUtil from "utils/imageSource.util";
import pagePaths from "constants/pagePaths";
import "styles/pages/blogs.module.scss";
import ThemeWidgetSearch from "components/theme/widgets/search";
import ThemeWidgetCategories from "components/theme/widgets/categories";
import postTermService from "services/postTerm.service";
import {PostTermGetResultDocument} from "types/services/postTerm";
import Variable from "library/variable";
import ComponentPagination from "components/tools/pagination";
import PagePaths from "constants/pagePaths";
import ComponentPageHeader from "components/tools/pageHeader";

const perPageItemCount = 6;

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{
    blogs: PostGetManyResultDocument[]
    categories: PostTermGetResultDocument[]
    maxBlogCount: number
}>;

export default class PageBlogs extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    Item = (props: PostGetManyResultDocument) => {
        return (
            <div className="col-md-10 mb-3">
                <article className="blog-post">
                    <Image
                        src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                        alt={props.contents?.title ?? ""}
                        height={300}
                        width={350}
                    />
                    <div className="terms d-flex flex-row flex-wrap">
                        {
                            props.categories?.map(category => (
                                <a href={pagePaths.blogs().category(category.contents?.url).self()}>{category.contents?.title}</a>
                            ))
                        }
                    </div>
                    <div className="content">
                        <small>{new Date(props.createdAt || "").toLocaleString()}</small>
                        <h5>
                            <a href={pagePaths.blog(props.contents?.url)}>{props.contents?.title}</a>
                        </h5>
                        <p>{props.contents?.shortContent}</p>
                    </div>
                </article>
            </div>
        );
    };

    render() {
        let paginationMax = Math.ceil(this.props.themeData.maxBlogCount / perPageItemCount);
        return (
            <div className="page page-blogs">
                <ComponentPageHeader title={`${this.props.pageData?.contents?.title}`} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row justify-content-center blogs">
                                {
                                    this.props.themeData.blogs.map(blog => <this.Item {...blog} />)
                                }
                            </div>
                            {
                                paginationMax > 1
                                    ? <ComponentPagination
                                        max={paginationMax}
                                        appData={this.props.appData}
                                        router={this.props.router}
                                        pagePath={
                                            this.props.router.query.categoryURL
                                                ? pagePaths.blogs().category(this.props.router.query.categoryURL as string)
                                                : this.props.router.query.search
                                                    ? pagePaths.blogs().search(this.props.router.query.search as string)
                                                    : pagePaths.blogs()
                                        }
                                    /> : null
                            }
                        </div>
                        <div className="col-md-4">
                            <ThemeWidgetSearch appData={this.props.appData}
                                               url={this.props.router.query.search as string}
                                               pagePath={PagePaths.blogs()}/>
                            <ThemeWidgetCategories items={this.props.themeData.categories} appData={this.props.appData}
                                                   url={this.props.router.query.category as string}
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

    await pageLib.get(req, "", PageTypeId.Blogs);

    if (req.pageData) {
        req.themeData.blogs = [];

        let isGetBlogs = true;
        let page: number = Number(context.params?.page ?? 1) || 1;
        let search: string = context.params?.search as string || "";
        let categoryUrl: string = context.params?.category as string || "";
        let categoryId: string = "";

        if (context.params?.category) {
            let category = (await postTermService.getOne({
                postTypeId: PostTypeId.Blog,
                typeId: PostTermTypeId.Category,
                url: categoryUrl
            })).data

            if (category) {
                categoryId = category._id;
            }
        }

        if (!Variable.isEmpty(categoryUrl) && Variable.isEmpty(categoryId)) {
            isGetBlogs = false;
        }

        if (isGetBlogs) {
            req.themeData.maxBlogCount = (
                await postService.getCount({
                    typeId: PostTypeId.Blog,
                    statusId: StatusId.Active,
                    title: Variable.isEmpty(search) ? undefined : search,
                    categories: Variable.isEmpty(categoryUrl) ? undefined : [categoryId],
                })
            ).data;

            if (req.themeData.maxBlogCount == 0) {
                isGetBlogs = false;
            }
        }

        if (isGetBlogs) {
            req.themeData.blogs = (
                await postService.getMany({
                    langId: req.appData.languageId,
                    typeId: [PostTypeId.Blog],
                    statusId: StatusId.Active,
                    title: Variable.isEmpty(search) ? undefined : search,
                    page: page,
                    categories: Variable.isEmpty(categoryUrl) ? undefined : [categoryId],
                    count: perPageItemCount,
                })
            ).data;
        }

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
