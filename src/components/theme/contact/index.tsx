import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import {ComponentDocument} from "types/models/component";


type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ThemeContact extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.components?.findSingle("elementId", "contact")
        }
    }

    render() {
        return (
            <section id="contact">
                <div className="col-lg-12">
                    <div className="wrapper">
                        <div className="row no-gutters">
                            <div className="col-md-12 align-items-stretch">
                                <div className="info-wrap">
                                    <h1 className="text-center mb-4"> {this.state.component?.types?.findSingle("elementId", "contact-info")?.contents?.content}</h1>
                                    <p className="text-center mb-4"> {this.state.component?.types?.findSingle("elementId", "contact-desc")?.contents?.content}</p>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12 dbox d-flex align-items-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-map-marker"></span>
                                            </div>
                                            <div className="text pl-3 mt-3">
                                                <p>
                                                    <span> {this.state.component?.types?.findSingle("elementId", "address")?.contents?.content}:</span> {this.state.component?.types?.findSingle("elementId", "address-desc")?.contents?.content}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 dbox d-flex align-items-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-phone"></span>
                                            </div>
                                            <div className="text pl-3 mt-3">
                                                <p>
                                                    <span> {this.state.component?.types?.findSingle("elementId", "phone")?.contents?.content}:</span> {this.state.component?.types?.findSingle("elementId", "phone-desc")?.contents?.content}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 dbox d-flex align-items-center">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <span className="fa fa-paper-plane"></span>
                                            </div>
                                            <div className="text pl-3 mt-3">
                                                <p>
                                                    <span> {this.state.component?.types?.findSingle("elementId", "email")?.contents?.content}:</span> {this.state.component?.types?.findSingle("elementId", "email-desc")?.contents?.content}
                                                </p></div>
                                        </div>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d188.135582570198!2d28.916649292690643!3d41.02155140869424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1673012012779!5m2!1str!2str"
                                            width="400" height="300" loading="lazy"></iframe>
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
