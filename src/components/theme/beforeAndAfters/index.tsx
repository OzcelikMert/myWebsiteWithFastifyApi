import React, {Component} from "react";
import {PostGetManyResultDocument} from "types/services/post";
import imageSourceUtil from "utils/imageSource.util";
import {PagePropCommonDocument} from "types/pageProps";
import Image from 'next/image'
import pagePaths from "constants/pagePaths";
import {ComponentDocument} from "types/models/component";
import ReactBeforeSliderComponent from 'react-before-after-slider-component';

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ beforeAndAfters?: PostGetManyResultDocument[] }>;

export default class ThemeBeforeAndAfters extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "beforeAndAfters")
        }
    }


    Item = (props: PostGetManyResultDocument) => {
        return (
            <div className="col-md-4 mt-3">
                <ReactBeforeSliderComponent
                    firstImage={{
                        imageUrl: imageSourceUtil.getUploadedImageSrc(props.beforeAndAfter?.imageBefore),
                        alt: props.contents?.title
                    }}
                    secondImage={{
                        imageUrl: imageSourceUtil.getUploadedImageSrc(props.beforeAndAfter?.imageAfter),
                        alt: props.contents?.title
                    }}
                    className={"img-before-after"}
                    currentPercentPosition={50}
                />
            </div>
        );
    };

    render() {
        return (
            <section id="beforeAndAfters">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="intro">
                                <h6>{this.state.component?.types.findSingle("elementId", "topTitle")?.contents?.content}</h6>
                                <h1>{this.state.component?.types.findSingle("elementId", "title")?.contents?.content}</h1>
                                <p className="mx-auto">{this.state.component?.types.findSingle("elementId", "desc")?.contents?.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.props.themeData?.beforeAndAfters?.map((beforeAndAfter) => this.Item(beforeAndAfter))}
                    </div>
                </div>
            </section>
        );
    }
}