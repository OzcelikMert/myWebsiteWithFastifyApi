import React from "react";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "classes/componentHelper.class";
import {IComponentGetResultService} from "types/services/component.service";
import Image from "next/image";
import {ImageSourceUtil} from "utils/imageSource.util";

type IPageState = {};

type IPageProps = {
    component: IComponentGetResultService;
} & IPagePropCommon;

class ComponentToolSubscribe extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    render() {
        return (
            <section className="subscribe-section">
                <div className="container">
                    <div className="content" style={{backgroundImage: `url(${ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("bgImage")?.content)})`}}>
                        <div className="subscribe-mask"></div>
                        <div className="card main-card">
                            <div className="card-body">
                                <div className="row d-flex">
                                    <div className="col-md-5 order-lg-2">
                                        <div className="row">
                                            <div className="col-6 d-flex align-items-center ps-1">
                                                <div className="row justify-content-end">
                                                    <div className="col-12 mb-3">
                                                        <Image
                                                            className="img-fluid"
                                                            src={ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("image1")?.content)}
                                                            alt={this.getComponentElementContents("title")?.content ?? ""}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>
                                                    <div className="col-11 mb-3">
                                                        <Image
                                                            className="img-fluid"
                                                            src={ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("image2")?.content)}
                                                            alt={this.getComponentElementContents("title")?.content ?? ""}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 d-flex align-items-center ps-1">
                                                <div className="row">
                                                    <div className="col-10 mb-3">
                                                        <Image
                                                            className="img-fluid"
                                                            src={ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("image3")?.content)}
                                                            alt={this.getComponentElementContents("title")?.content ?? ""}
                                                            width={50}
                                                            height={50}
                                                        />

                                                    </div>
                                                    <div className="col-11 mb-3">
                                                        <Image
                                                            className="img-fluid"
                                                            src={ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("image4")?.content)}
                                                            alt={this.getComponentElementContents("title")?.content ?? ""}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-7 mt-4 mt-md-0 d-flex flex-column align-items-center align-items-md-start justify-content-center pe-md-5 mb-3 mb-md-0 text-center text-md-start">
                                        <h1 className="card-title text-light">{this.getComponentElementContents("title")?.content}</h1>
                                        <p className="card-text text-light pe-md-5">{this.getComponentElementContents("describe")?.content}</p>
                                        <a href="#" className="btn btn-warning mt-3"><span>{this.getComponentElementContents("buttonText")?.content}</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ComponentToolSubscribe;