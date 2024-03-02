import React, {Component} from "react";
import {PostGetManyResultDocument} from "types/services/post";
import imageSourceUtil from "utils/imageSource.util";
import {PagePropCommonDocument} from "types/pageProps";
import Image from 'next/image'
import pagePaths from "constants/pagePaths";
import {ComponentDocument} from "types/models/component";

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ blogs?: PostGetManyResultDocument[] }>;

export default class ThemeLastBlogs extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "blogs")
        }
    }


    Item = (props: PostGetManyResultDocument) => {
        return (
            <div className="col-md-4">
                <article className="blog-post">
                    <Image
                        src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                        alt={props.contents?.title ?? ""}
                        height={250}
                        width={250}
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
        return (
            <section className="blogs">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="intro">
                                <h6>{this.state.component?.types.findSingle("elementId", "littleTitle")?.contents?.content}</h6>
                                <h1>{this.state.component?.types.findSingle("elementId", "title")?.contents?.content}</h1>
                                <p className="mx-auto">{this.state.component?.types.findSingle("elementId", "desc")?.contents?.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.themeData?.blogs?.map((blog) => this.Item(blog))}
                    </div>
                </div>
            </section>
        );
    }
}