import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import subscriberService from "services/subscriber.service";
import {ComponentGetResultDocument} from "types/services/component";

type PageState = {
    component?: ComponentGetResultDocument;
    isSubmittingSubscribe: boolean;
    isSuccessSubscribe: boolean;
    formData: {
        subscribeForm: {
            email: string;
        };
    };
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ComponentFooter extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.themeData.footer,
            isSubmittingSubscribe: false,
            isSuccessSubscribe: false,
            formData: {
                subscribeForm: {
                    email: "",
                },
            },
        };
    }

    onSubscribe(event: React.FormEvent) {
        event.preventDefault();

        this.setState({
                isSubmittingSubscribe: true,
            }, async () => {
                let resData = await subscriberService.add({
                    ...this.state.formData.subscribeForm,
                });
                this.setState({
                    isSubmittingSubscribe: false,
                    isSuccessSubscribe: true,
                });
            }
        );
    }

    render() {
        return (
            <footer id="footer">
                <div className="footer-top text-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h4 className="navbar-brand">
                                    {this.state.component?.types?.findSingle("elementId", "logo")?.contents?.content}<span
                                    className="dot">.</span>
                                </h4>
                                <p>
                                    {this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}
                                </p>
                                <div className="col-auto social-icons">
                                    <a href="#">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-twitter"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-pinterest"></i>
                                    </a>
                                </div>
                                <div className="col-auto conditions-section">
                                    <a href="#">privacy</a>
                                    <a href="#">terms</a>
                                    <a href="#">disclaimer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center">
                    <p className="mb-0">&copy; Copyright MerkerSoft {(new Date()).getFullYear()}. All rights
                        Reserved</p>
                </div>
            </footer>
        );
    }
}
