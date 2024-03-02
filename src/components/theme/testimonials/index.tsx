import React, {Component} from "react";
import {PostGetManyResultDocument} from "types/services/post";
import {Carousel} from "react-responsive-carousel";
import HTMLReactParser from "html-react-parser";
import {PagePropCommonDocument} from "types/pageProps";
import {ComponentDocument} from "types/models/component";

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ testimonials?: PostGetManyResultDocument[] }>;

export default class ThemeTestimonials extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "testimonials")
        }
    }

    Item = (props: PostGetManyResultDocument) => {
        return (
            <div className="review">
                <div className="person">
                    <img src="img/team_1.jpg" alt=""/>
                    <h5>{props.contents?.title}</h5>
                    <small>{props.contents?.shortContent}</small>
                </div>
                <h3>{HTMLReactParser(props.contents?.content || "")}</h3>
                <div className="stars">
                    <i className='bi bi-star'></i>
                    <i className='bi bi-star'></i>
                    <i className='bi bi-star'></i>
                    <i className='bi bi-star'></i>
                    <i className="bi bi-star-half"></i>
                </div>
                <i className='bx bxs-quote-alt-left'></i>
                {/* <Image
                    src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                    className="img-fluid testimonial-img"
                    alt={props.contents?.title ?? ""}
                    height={250}
                    width={250}
                /> */}
            </div>
        );
    };

    render() {
        return (
            <section id="testimonials">
                <div className="owl-theme owl-carousel testimonials-carousel reviews-slider wow container">
                    <Carousel
                        infiniteLoop={true}
                        autoPlay={true}
                        showArrows={false}
                        emulateTouch
                        showThumbs={false}
                        showStatus={false}
                    >
                        {this.props.themeData?.testimonials?.map((testimonial) => <this.Item {...testimonial}/>)}
                    </Carousel>
                </div>
            </section>
        );
    }
}
