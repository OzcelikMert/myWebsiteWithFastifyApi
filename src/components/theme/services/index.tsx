import React, {Component} from "react";
import {PostGetManyResultDocument} from "types/services/post";
import {PagePropCommonDocument} from "types/pageProps";
import {ComponentDocument} from "types/models/component";

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ services?: PostGetManyResultDocument[] }>;

export default class ThemeServices extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "services")
        }
    }

    itemCount = 0;
    itemRow = 1;

    Item = (props: PostGetManyResultDocument) => {
        this.itemCount++;
        if (this.itemRow === 1 && this.itemCount > 3) {
            this.itemRow = 2;
            this.itemCount = 1;
        } else if (this.itemRow === 2 && this.itemCount > 2) {
            this.itemRow = 1;
            this.itemCount = 1;
        }

        return (
            <div className="col-lg-4 col-md-6">
                <div className="service">
                    <i className={props.contents?.icon}></i>
                    <h5>{props.contents?.title}</h5>
                    <p>{props.contents?.shortContent}</p>
                </div>
            </div>
        );
    };

    render() {
        return (
            <section id="services" className="text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="intro">
                                <h6>{this.state.component?.types.findSingle("elementId", "topTitle")?.contents?.content}</h6>
                                <h1>{this.state.component?.types.findSingle("elementId", "mainTitle")?.contents?.content}</h1>
                                <p className="mx-auto">{this.state.component?.types.findSingle("elementId", "mainDesc")?.contents?.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        {this.props.themeData?.services?.map((service) => this.Item(service))}
                    </div>
                </div>
            </section>
        );
    }
}
