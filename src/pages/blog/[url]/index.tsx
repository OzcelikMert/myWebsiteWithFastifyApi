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
import {IPostTermPopulateService} from "types/services/postTerm.service";
import {URLUtil} from "@utils/url.util";
import {EndPoints} from "@constants/endPoints";
import {IUserPopulateService} from "types/services/user.service";
import Image from "next/image";
import {ImageSourceUtil} from "@utils/imageSource.util";
import {DateMask} from "@library/variable/date";

type PageState = {};

type PageProps = {} & IPagePropCommon<{ blog?: IPostGetOneResultService, url?: string }>;

export default class PageBlogURL extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    Author = (props: IUserPopulateService, index: number) => {
        let blog = this.props.pageData.blog;
        let date = new Date(blog?.createdAt ?? "");
        return (
            <div className="author mt-2">
                <div className="row">
                    <div className="col-8">
                        <div className="avatar d-inline-block me-3">
                            <a href="#" className="hover-top">
                                <Image
                                    src={ImageSourceUtil.getUploadedImageSrc(props.image)}
                                    alt={props.name}
                                    className="img-fluid"
                                    width={35}
                                    height={35}
                                />
                            </a>
                        </div>
                        <div className="d-inline-block">
                            <div className="author">
                                {this.props.t("by")} <a href="#"><span>{props.name}</span></a>
                            </div>
                            <div className="date">
                                <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                                    <span>{date.toDateString()}</span>
                                </time>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-end fs-4">
                        <a className="pe-1" href={props.facebook || "#"}>
                            <span><i className="mdi mdi-facebook"></i></span>
                        </a>
                        <a className="pe-1" href={props.instagram || "#"}>
                            <span><i className="mdi mdi-instagram"></i></span>
                        </a>
                        <a href={props.twitter || "#"}>
                            <span><i className="mdi mdi-twitter"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    Category = (props: IPostTermPopulateService, index: number) => {
        let categoryURL = URLUtil.createHref({
            url: this.props.getURL,
            targetPath: EndPoints.BLOGS_WITH.CATEGORY(props.contents.url)
        });
        return (
            <a href={categoryURL} className="btn btn-light"> <span>{props.contents.title}</span></a>
        );
    }

    PrevBlog = () => {
        let blog = this.props.pageData.blog?.prev;
        let blogURL = URLUtil.createHref({url: this.props.getURL, targetPath: EndPoints.BLOG(blog?.contents?.url)});
        let date = new Date(blog?.createdAt ?? "");
        return (
            <article className="prev-blog" title={blog?.contents?.title}>
                <div className="card">
                    <div className="card-body d-flex flex-row">
                        <div className="image hover-top">
                            <a href={blogURL} className="img-link">
                                <Image
                                    src={ImageSourceUtil.getUploadedImageSrc(blog?.contents?.image)}
                                    alt={blog?.contents?.title ?? ""}
                                    className="img-fluid rounded-4"
                                    width={150}
                                    height={150}
                                />
                            </a>
                        </div>
                        <div className="ms-3 align-content-center">
                            <a href={blogURL} className="fw-bold fs-4">
                                <span>{blog?.contents?.title}</span>
                            </a>
                            <div className="date">
                                <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                                    <span>{date.toDateString()}</span>
                                </time>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    NextBlog = () => {
        let blog = this.props.pageData.blog?.next;
        let blogURL = URLUtil.createHref({url: this.props.getURL, targetPath: EndPoints.BLOG(blog?.contents?.url)});
        let date = new Date(blog?.createdAt ?? "");
        return (
            <article className="next-blog" title={blog?.contents?.title}>
                <div className="card">
                    <div className="card-body d-flex flex-row justify-content-end">
                        <div className="align-content-center me-3">
                            <a href={blogURL} className="fw-bold fs-4">
                                <span>{blog?.contents?.title}</span>
                            </a>
                            <div className="date">
                                <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                                    <span>{date.toDateString()}</span>
                                </time>
                            </div>
                        </div>
                        <div className="image hover-top">
                            <a href={blogURL} className="img-link">
                                <Image
                                    src={ImageSourceUtil.getUploadedImageSrc(blog?.contents?.image)}
                                    alt={blog?.contents?.title ?? ""}
                                    className="img-fluid rounded-4"
                                    width={150}
                                    height={150}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    render() {
        let blog = this.props.pageData.blog;
        return (
            <ComponentAppLayout
                {...this.props}
                pageTitle={`${this.props.t("blog")} - ${blog?.contents?.title || this.props.pageData.url}`}
                headerBgImage={blog?.contents?.image}
                headerContent={blog?.contents?.shortContent}
            >
                <div className="page page-blog">
                    <section className="blog-section">
                        <div className="container">
                            <article title={blog?.contents?.title}>
                                <div className="content">
                                    {this.props.pageData.blog?.contents?.content ? (HTMLReactParser(blog?.contents?.content || "")) : null}
                                </div>
                                <div className="content-bottom mt-5">
                                    <div className="categories pb-3 border-bottom">
                                        <h6 className="fw-bold">{this.props.t("categories")}</h6>
                                        <div className="blog-category-badges">
                                            {
                                                this.props.pageData.blog?.categories?.map((category, index) => this.Category(category, index))
                                            }
                                        </div>
                                    </div>
                                    <div className="authors mt-3">
                                        <h6 className="fw-bold">{this.props.t("authors")}</h6>
                                        {
                                            blog ? [blog.authorId, ...(blog.authors ?? [])].map((author, index) => this.Author(author, index)) : null
                                        }
                                    </div>
                                </div>
                            </article>
                            <div className="prev-next mt-5 blogs">
                                <div className="title border-bottom">
                                    <h6 className="d-inline-block w-50">Previous</h6>
                                    <h6 className="d-inline-block w-50 text-end">Next</h6>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 text-start">
                                        {this.props.pageData.blog?.prev ? <this.PrevBlog /> : null}
                                    </div>
                                    <div className="col-md-6 text-end">
                                        {this.props.pageData.blog?.next ? <this.NextBlog /> : null}
                                    </div>
                                </div>
                            </div>
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
        statusId: StatusId.Active,
        isIncludePrevAndNext: true
    });

    if (serviceResultBlog.status && serviceResultBlog.data) {
        req.pageData.page = {} as any;
        req.pageData.blog = serviceResultBlog.data;

        await PostService.updateViewWithId({
            _id: serviceResultBlog.data._id,
            typeId: serviceResultBlog.data.typeId,
            langId: req.appData.selectedLangId
        });

        if (serviceResultBlog.data.tags && serviceResultBlog.data.tags.length > 0) {
            req.pageData.page!.tags = serviceResultBlog.data.tags;
        }
    }

    return {
        props: PageUtil.getCommonProps(req),
    };
}