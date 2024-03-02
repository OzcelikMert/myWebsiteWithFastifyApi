import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import {ComponentDocument} from "types/models/component";

type PageState = {
    component?: ComponentDocument;
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ThemeWhyUs extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "whyUs"),
        };
    }

    render() {
        return (
            <section id="whyUs">
                <div className="container">
                    <div className="row text-center justify-content-center gy-4">
                        <div className="col-lg-4 col-sm-12 mb-4">
                            <h1 className="display-4">{this.state.component?.types?.findSingle("elementId", "title1")?.contents?.content}</h1>
                            <p className="mb-0">{this.state.component?.types?.findSingle("elementId", "desc1")?.contents?.content}</p>
                        </div>
                        <div className="col-lg-4 col-sm-12 mb-4">
                            <h1 className="display-4">{this.state.component?.types?.findSingle("elementId", "title2")?.contents?.content}</h1>
                            <p className="mb-0">{this.state.component?.types?.findSingle("elementId", "desc2")?.contents?.content}</p>
                        </div>
                        <div className="col-lg-4 col-sm-12 mb-4">
                            <h1 className="display-4">{this.state.component?.types?.findSingle("elementId", "title3")?.contents?.content}</h1>
                            <p className="mb-0">{this.state.component?.types?.findSingle("elementId", "desc3")?.contents?.content}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
