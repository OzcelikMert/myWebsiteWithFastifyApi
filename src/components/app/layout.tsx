import React, {Component} from "react";
import ProviderNoFound from "@components/providers/noFound";
import ComponentHead from "@components/head";
import {IPagePropCommon} from "types/pageProps";
import ComponentToolSubscribe from "@components/tools/subscribe";
import {ComponentKey} from "@constants/componentKeys";
import ComponentToolFooter from "@components/tools/footer";
import ComponentToolNavbar from "@components/tools/navbar";
import ComponentToolVideoHeader from "@components/tools/videoHeader";

type PageState = {};

type PageProps = {
    children: JSX.Element
    pageTitle?: string
} & IPagePropCommon;

export default class ComponentAppLayout extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        let subscribeComponent = this.props.appData.toolComponents.findSingle("key", ComponentKey.Subscribe);
        let footerComponent = this.props.appData.toolComponents.findSingle("key", ComponentKey.Footer);
        let navbarComponent = this.props.appData.toolComponents.findSingle("key", ComponentKey.Navbar);
        let videoHeaderComponent = this.props.appData.toolComponents.findSingle("key", ComponentKey.VideoHeader);

        return (
            <div>
                <ComponentHead {...this.props} title={this.props.pageTitle} />
                {
                    navbarComponent
                        ? <ComponentToolNavbar component={navbarComponent} {...this.props} />
                        : null
                }
                <div className="container-fluid main-section" id="main-section">
                        <div className="page-content">
                            {
                                videoHeaderComponent
                                    ? <ComponentToolVideoHeader component={videoHeaderComponent} {...this.props} title={this.props.pageTitle} />
                                    : null
                            }
                            <ProviderNoFound {...this.props}>
                                {this.props.children}
                            </ProviderNoFound>
                        </div>
                    {
                        subscribeComponent
                            ? <ComponentToolSubscribe component={subscribeComponent} {...this.props} />
                            : null
                    }
                    {
                        footerComponent
                            ? <ComponentToolFooter component={footerComponent} {...this.props} />
                            : null
                    }
                </div>
            </div>
        );
    }
}