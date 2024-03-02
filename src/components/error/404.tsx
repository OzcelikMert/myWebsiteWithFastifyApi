import {PagePropCommonDocument} from "types/pageProps";
import React, {Component} from "react";
import i18Lib from "lib/i18.lib";
import linkUtil from "utils/link.util";
import ComponentPageHeader from "components/tools/pageHeader";

type PageState = {};

type PageProps = {
    appData: PagePropCommonDocument<{}>["appData"]
};

export default class ComponentError404 extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <ComponentPageHeader title={`404 ${i18Lib.get("pageNotFound")}`} />
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <i className="bi bi-exclamation-triangle triangle-color display-1"></i>
                                <h1 className="display-1 font">404</h1>
                                <h1 className="mb-4 font">{i18Lib.get("pageNotFound")}</h1>
                                <p className="mb-4 desc">{i18Lib.get("pageNotFoundDesc")}</p>
                                <a className="btn btn-color rounded-pill py-3 px-5" href={linkUtil.target(this.props.appData, "")}>
                                    {i18Lib.get("returnHomePage")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
