import React, {Component} from "react";
import {IPagePropCommon} from "types/pageProps";

type PageState = {};

type PageProps = {} & IPagePropCommon;

export default class ComponentError404 extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <i className="bi bi-exclamation-triangle triangle-color display-1"></i>
                                <h1 className="display-1 font">404</h1>
                                <h1 className="mb-4 font">{this.props.t("pageNotFound")}</h1>
                                <p className="mb-4 desc">{this.props.t("pageNotFoundDesc")}</p>
                                <a className="btn btn-color rounded-pill py-3 px-5" href="/">
                                    {this.props.t("returnHomePage")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
