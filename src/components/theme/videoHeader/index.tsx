import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "classes/componentHelper.class";

type IPageState = {};

type IPageProps = {
    component: IComponentModel;
} & IPagePropCommon;

class ComponentThemeVideoHeader extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    render() {
        return (
            <section className="header-section container-fluid home" id="header">
                <div className="video-wrap">
                    <video className="video-bg" autoPlay playsInline loop muted preload="none" title="Water">
                        <source src={this.getComponentElementContents("videoURL")?.content}
                                type="video/mp4"/>
                        <source src={this.getComponentElementContents("videoURL")?.content}
                                type="video/mp4"/>
                    </video>
                </div>
                <div className="mask"></div>
                <div className="content">
                    <h2>{this.props.appData.settings.seoContents?.title}</h2>
                    <p>{this.getComponentElementContents("content")?.content}</p>
                    <a href="#main-section" className="btn btn-primary btn-lg mt-3"> <span>{this.getComponentElementContents("buttonText")?.content}</span></a>
                </div>
            </section>
        );
    }
}

export default ComponentThemeVideoHeader;