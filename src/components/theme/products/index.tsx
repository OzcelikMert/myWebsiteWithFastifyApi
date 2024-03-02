import React, {Component} from "react";
import {PostGetManyResultDocument} from "types/services/post";
import imageSourceUtil from "utils/imageSource.util";
import {PagePropCommonDocument} from "types/pageProps";
import Image from "next/image";
import productLib from "lib/product.lib";
import {ComponentDocument} from "types/models/component";

type PageState = {
    component?: ComponentDocument;
};

type PageProps = {} & PagePropCommonDocument<{ products?: PostGetManyResultDocument[] }>;

export default class ThemeProducts extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "products"),
        };
    }

    componentDidMount() {
        console.log(this.props.themeData.products)
    }

    Item = (props: PostGetManyResultDocument) => {
        let eCommerce = productLib.getPricingDefault(props);
        return (
            <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                <div className="product-item">
                    <div className="position-relative">
                        <Image
                            src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                            alt={props.contents?.title ?? ""}
                            className="w-100"
                            height={250}
                            width={250}
                        />
                    </div>
                    <div className="text-center p-4">
                        <span className="d-block h5">
                          {props.contents?.title}
                        </span>
                        {
                            eCommerce.compared !== 0
                                ? <span className="text-decoration-line-through me-1">{eCommerce.compared} {productLib.getCurrencyType(this.props.appData.settings.eCommerce?.currencyId)?.icon}</span>
                                : null
                        }
                        <span className="text-primary fs-4">{eCommerce.taxIncluded} {productLib.getCurrencyType(this.props.appData.settings.eCommerce?.currencyId)?.icon}</span>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <section id="products">
                <div className="container-xxl py-5">
                    <div className="container">
                        <div
                            className="text-center mx-auto wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{maxWidth: "500px"}}
                        >
                            <p className="section-title text-center px-3">{this.state.component?.types.findSingle("elementId", "topTitle")?.contents?.content}</p>
                            <h1 className="mb-5">{this.state.component?.types.findSingle("elementId", "title")?.contents?.content}</h1>
                        </div>
                        <div className="row gx-4">
                            {this.props.themeData?.products?.map((product) =>
                                this.Item(product)
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
