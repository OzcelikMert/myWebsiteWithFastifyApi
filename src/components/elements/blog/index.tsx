import React, {Component} from "react";
import Image from "next/image";
import {ImageSourceUtil} from "@utils/imageSource.util";
import {IPostTermPopulateService} from "types/services/postTerm.service";
import {IUserPopulateService} from "types/services/user.service";
import {DateMask} from "@library/variable";
import {IPostGetManyResultService} from "types/services/post.service";
import {IPagePropCommon} from "types/pageProps";
import {URLUtil} from "@utils/url.util";
import {EndPoints} from "@constants/endPoints";

type IPageState = {};

type IPageProps = {
    item: IPostGetManyResultService
    hideAuthorImage?: boolean
    hideShortContent?: boolean
    index?: number
    className?: string
    imageHeight?: number
    imageWidth?: number
    imageAuthorHeight?: number
    imageAuthorWidth?: number
} & IPagePropCommon;

export default class ComponentBlog extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    Authors = (props: IUserPopulateService[], createdAt: string) => {
        let date = new Date(createdAt);
        return (
            <div key={this.props.item._id} className="meta">
                <div className="meta-avatars">
                    {
                        this.props.hideAuthorImage ? null
                            : props.map(author => (
                                <a href="#" className="hover-top">
                                    <Image
                                        src={ImageSourceUtil.getUploadedImageSrc(author.image)}
                                        alt={author.name}
                                        className="img-fluid"
                                        width={this.props.imageAuthorWidth ?? 50}
                                        height={this.props.imageAuthorHeight ?? 50}
                                    />
                                </a>
                            ))
                    }
                </div>
                <div className="meta-contents">
                    <div className="meta-authors">
                        {this.props.t("by")} {
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
                            <span>{date.toDateString()}</span>
                        </time>
                    </div>
                </div>
            </div>
        )
    }

    Category = (props: IPostTermPopulateService, index: number) => {
        let categoryURL = URLUtil.createHref({url: this.props.getURL, targetPath: EndPoints.BLOGS_WITH.CATEGORY(props.contents.url)});
        return (
            <a href={categoryURL} className="btn btn-light"> <span>{props.contents.title}</span></a>
        );
    }

    render() {
        let blogURL = URLUtil.createHref({url: this.props.getURL, targetPath: EndPoints.BLOG(this.props.item.contents?.url)});
        return (
            <article className={this.props.className} title={this.props.item.contents?.title}>
                <div className="card">
                    <div className="card-header hover-top">
                        <a href={blogURL} className="img-link">
                            <Image
                                src={ImageSourceUtil.getUploadedImageSrc(this.props.item.contents?.image)}
                                alt={this.props.item.contents?.title ?? ""}
                                className="img-fluid"
                                width={this.props.imageWidth ?? 500}
                                height={this.props.imageHeight ?? 250}
                            />
                        </a>
                    </div>
                    <div className="card-body">
                        <div className="blog-category-badges">
                            {
                                this.props.item.categories?.map((category, index) => this.Category(category, index))
                            }
                        </div>
                        <a href={blogURL} className="card-title">
                            <span>{this.props.item.contents?.title}</span>
                        </a>
                        <p className="card-text">
                            {this.props.hideShortContent ? null : this.props.item.contents?.shortContent}
                        </p>
                    </div>
                    <div className="card-footer">
                        {
                            this.Authors([this.props.item.authorId, ...(this.props.item.authors ?? [])], this.props.item.createdAt ?? "")
                        }
                    </div>
                </div>
            </article>
        );
    }
}
