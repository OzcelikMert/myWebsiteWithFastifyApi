import React, {Component} from "react";
import imageSourceUtil from "utils/imageSource.util";
import {ComponentDocument} from "types/models/component";
import {PagePropCommonDocument} from "types/pageProps";
import Image from "next/image";

type PageState = {
    component?: ComponentDocument;
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ThemeAbout extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "about"),
        };
    }

    render() {
        return (
            <section id="about">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 py-5">
                            <div className="row">
                                <div className="col-12">
                                    <div className="info-box">
                                        <i className={this.state.component?.types?.findSingle("elementId", "icon1")?.contents?.content}></i>
                                        <div className="ms-4">
                                            <h5>
                                                {this.state.component?.types?.findSingle("elementId", "title1")?.contents?.content}
                                            </h5>
                                            <p>
                                                {this.state.component?.types?.findSingle("elementId", "desc1")?.contents?.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="info-box">
                                        <i className={this.state.component?.types?.findSingle("elementId", "icon2")?.contents?.content}></i>
                                        <div className="ms-4">
                                            <h5>
                                                {this.state.component?.types?.findSingle("elementId", "title2")?.contents?.content}
                                            </h5>
                                            <p>
                                                {this.state.component?.types?.findSingle("elementId", "desc2")?.contents?.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="info-box">
                                        <i className={this.state.component?.types?.findSingle("elementId", "icon3")?.contents?.content}></i>
                                        <div className="ms-4">
                                            <h5>
                                                {this.state.component?.types?.findSingle("elementId", "title3")?.contents?.content}
                                            </h5>
                                            <p>
                                                {this.state.component?.types?.findSingle("elementId", "desc3")?.contents?.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <Image
                                src={imageSourceUtil.getUploadedImageSrc(this.state.component?.types?.findSingle("elementId", "thumbnail")?.contents?.content)}
                                alt={this.state.component?.types?.findSingle("elementId", "title3")?.contents?.content ?? ""}
                                className="image-size circle"
                                height={500}
                                width={500}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
