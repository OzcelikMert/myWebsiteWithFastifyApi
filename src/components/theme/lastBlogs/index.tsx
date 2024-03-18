import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "../../../classes/componentHelper.class";
import {IPostGetManyResultService} from "types/services/post.service";
import Image from "next/image";
import {ImageSourceUtil} from "utils/imageSource.util";
import {IPostTermPopulateService} from "types/services/postTerm.service";
import {IUserPopulateService} from "types/services/user.service";
import {DateMask} from "library/variable";
import {PostService} from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";

type IPageState = {
    lastBlogs: IPostGetManyResultService[]
    isLoadingShowMoreButton: boolean
    isActiveShowMoreButton: boolean
};

type IPageProps = {
    component: IComponentModel;
} & IPagePropCommon<{ lastBlogs?: IPostGetManyResultService[], maxBlogCount?: number }>;

export const lastBlogsPerPageBlogCount = 3;

export default class ComponentThemeLastBlogs extends ComponentHelperClass<IPageProps, IPageState> {
    pageNumber = 1;

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            lastBlogs: this.props.pageData.lastBlogs ?? [],
            isLoadingShowMoreButton: false,
            isActiveShowMoreButton: true
        }
    }

    async onClickShowMore() {
        this.setState({
            isLoadingShowMoreButton: true
        }, async () => {
            this.pageNumber += 1;
            let serviceResult = await PostService.getMany({
                langId: this.props.appData.selectedLangId,
                typeId: [PostTypeId.Blog],
                statusId: StatusId.Active,
                count: lastBlogsPerPageBlogCount,
                page: this.pageNumber
            });
            if(serviceResult.status && serviceResult.data){
                this.setState({
                    lastBlogs: [...this.state.lastBlogs, ...serviceResult.data]
                }, () => {
                    this.setState({
                        isActiveShowMoreButton: (this.props.pageData.maxBlogCount ?? 0) > this.state.lastBlogs.length
                    })
                })
            }
            this.setState({
                isLoadingShowMoreButton: false
            })
        })
    }

    Authors = (props: IUserPopulateService[], createdAt: string) => {
        let date = new Date(createdAt);
        return (
            <div className="meta">
                <div className="meta-avatars">
                    {
                        props.map(author => (
                            <a href="#" className="hover-top">
                                <Image
                                    src={ImageSourceUtil.getUploadedImageSrc(author.image)}
                                    alt={author.name}
                                    className="img-fluid"
                                    width="50"
                                    height="50"
                                />
                            </a>
                        ))
                    }
                </div>
                <div className="meta-contents">
                    <div className="meta-authors">
                        {
                            props.map((author, index) => (
                                <span>
                                    <a href="#"><span>{author.name}</span></a>
                                    {index < props.length - 1 ? " & " : ""}
                                </span>
                            ))
                        }
                    </div>
                    <div className="meta-date">
                        <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                            <span>{date.toLocaleDateString()}</span>
                        </time>
                    </div>
                </div>
            </div>
        )
    }

    Category = (props: IPostTermPopulateService, index: number) => {
        return (
            <a href="#" className="btn btn-light"> <span>{props.contents.title}</span></a>
        );
    }

    Blog = (props: IPostGetManyResultService, index: number) => {
        return (
            <article className="col-md-4">
                <div className="card">
                    <div className="card-header hover-top">
                        <a href="#" className="img-link">
                            <Image
                                src={ImageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                                alt={props.contents?.title ?? ""}
                                className="img-fluid"
                                width="250"
                                height="250"
                            />
                        </a>
                    </div>
                    <div className="card-body">
                        <div className="blog-category-badges">
                            {
                                props.categories?.map((category, index) => this.Category(category, index))
                            }
                        </div>
                        <a href="#" className="card-title">
                            <span>{props.contents?.title}</span>
                        </a>
                        <p className="card-text">
                            {props.contents?.shortContent}
                        </p>
                    </div>
                    <div className="card-footer">
                        {
                            this.Authors([props.authorId, ...(props.authors ?? [])], props.createdAt ?? "")
                        }
                    </div>
                </div>
            </article>
        );
    }

    render() {
        return (
            <section className="blogs-section">
                <div className="container">
                    <h2 className="section-header">{this.getComponentElementContents("title")?.content}</h2>
                    <p className="section-content">{this.getComponentElementContents("describe")?.content}</p>
                    <div className="blogs">
                        <div className="row">
                            {
                                this.state.lastBlogs.map((blog, index) => this.Blog(blog, index))
                            }
                        </div>
                    </div>
                    <div className="w-100 pt-5 text-center show-more">
                        {
                            this.state.isActiveShowMoreButton
                                ? <button className="btn btn-outline-primary btn-lg" onClick={event => this.onClickShowMore()} disabled={this.state.isLoadingShowMoreButton}>
                                        {this.state.isLoadingShowMoreButton ? (<i className="fa fa-spinner fa-spin me-1"></i>) : null}
                                        <span>{this.getComponentElementContents("buttonText")?.content}</span>
                                </button> : null
                        }
                    </div>
                </div>
            </section>
        );
    }
}
