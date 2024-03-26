import React from "react";
import Image from "next/image";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ImageSourceUtil} from "utils/imageSource.util";
import {ComponentHelperClass} from "classes/componentHelper.class";
import Thread from "library/thread";
import {TypeAnimation} from "react-type-animation";

type IPageState = {};

type IPageProps = {
    component: IComponentModel;
} & IPagePropCommon;

export default class ComponentThemeHero extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <section className="hero-section" id="hero-section">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-lg-8 order-lg-2">
                            <div className="position-relative img-container">
                                <Image
                                    src={ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents("image")?.content)}
                                    alt={this.getComponentElementContents("title1")?.content ?? ""}
                                    className="img-fluid"
                                    height={500}
                                    width={500}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 pe-lg-5 m-auto">
                            <div className="type">
                                <h1 className="font" id="feature-text">
                                    <TypeAnimation
                                        sequence={[
                                            this.getComponentElementContents("title1")?.content ?? "",
                                            2500,
                                            this.getComponentElementContents("title2")?.content ?? "",
                                            2500,
                                            this.getComponentElementContents("title3")?.content ?? "",
                                            2500,
                                            this.getComponentElementContents("title4")?.content ?? "",
                                            2500
                                        ]}
                                        wrapper="span"
                                        repeat={Infinity}
                                        cursor={false}
                                        speed={1}
                                        deletionSpeed={5}
                                        preRenderFirstString={true}
                                    />
                                </h1>
                            </div>
                            <p className="lead">{this.getComponentElementContents("describe")?.content}</p>
                            <a href="#blogs" className="btn btn-primary btn-lg w-100 mt-3">
                                <span>{this.getComponentElementContents("buttonText")?.content}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
