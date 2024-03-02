import React, {Component} from "react";
import {PostGetManyResultDocument} from "types/services/post";
import imageSourceUtil from "utils/imageSource.util";
import {PagePropCommonDocument} from "types/pageProps";
import Image from 'next/image';
import Slider, {Settings} from "react-slick";
import {ComponentDocument} from "types/models/component";

type PageState = {
    component?: ComponentDocument
    settings: Settings
};

type PageProps = {} & PagePropCommonDocument<{ clients?: PostGetManyResultDocument[] }>;

export default class ThemeClients extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "clients"),
            settings: {
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 5000,
                cssEase: "linear",
                centerPadding: "60px",
                initialSlide: 0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }
        }
    }

    Item = (props: PostGetManyResultDocument) => {
        return (
            <div className="project">
                <div className="overlay"></div>
                <Image
                    src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                    className="img-fluid project-img"
                    alt={props.contents?.title ?? ""}
                    height={250}
                    width={648}
                />
                <div className="content">
                    <h2>{props.contents?.title}</h2>
                    <h6>{props.contents?.shortContent}</h6>
                </div>
            </div>
        );
    };

    render() {
        return (
            <section id="clients">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="intro">
                                <h6>Work</h6>
                                <h1>{this.state.component?.types?.findSingle("elementId", "title")?.contents?.content}</h1>
                                <p className="mx-auto">{this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Slider {...this.state.settings}>
                        {this.props.themeData?.clients?.map((client) => <this.Item {...client} />)}
                    </Slider>
                </div>
            </section>
        );
    }
}
