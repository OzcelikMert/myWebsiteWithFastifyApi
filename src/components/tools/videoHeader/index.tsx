import React from "react";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "@classes/componentHelper.class";
import {IComponentGetResultService} from "types/services/component.service";
import {PageTypeId} from "@constants/pageTypes";

type IPageState = {};

type IPageProps = {
    component: IComponentGetResultService;
} & IPagePropCommon;

class ComponentToolVideoHeader extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    HomePageContent = () => {
        return (
            <div className="content">
                <h2>{this.props.appData.settings.seoContents?.title}</h2>
                <p>{this.getComponentElementContents("content")?.content}</p>
                <a href="#hero-section" className="btn btn-primary btn-lg mt-3">
                    <span>{this.getComponentElementContents("buttonText")?.content}</span></a>
            </div>
        )
    }

    PageContent = () => {
        return (
            <div className="content">
                <h2>{this.props.pageData.page?.contents?.title}</h2>
            </div>
        )
    }

    render() {
        let isHomePage = this.props.pageData.page?.pageTypeId == PageTypeId.HomePage;
        return (
            <section className={`header-section container-fluid ${isHomePage ? "home" : ""}`} id="header">
                <div className="video-wrap">
                    <video className="video-bg" autoPlay playsInline loop muted preload="none" title="Water">
                        <source src={this.getComponentElementContents("videoURL")?.content}
                                type="video/mp4"/>
                        <source src={this.getComponentElementContents("videoURL")?.content}
                                type="video/mp4"/>
                    </video>
                </div>
                <div className="mask"></div>
                {
                    isHomePage
                        ? <this.HomePageContent />
                        : <this.PageContent />
                }
            </section>
        );
    }
}

export default ComponentToolVideoHeader;