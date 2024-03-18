import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ImageSourceUtil} from "utils/imageSource.util";
import {IPostTermGetResultService} from "types/services/postTerm.service";
import {ComponentHelperClass} from "../../../classes/componentHelper.class";

type IPageState = {};

type IPageProps = {
    component: IComponentModel;
} & IPagePropCommon<{categories?: IPostTermGetResultService[]}>;

export default class ComponentThemeHotCategories extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    Category = (props: IPostTermGetResultService, index: number) => {
        return (
            <div className={`option ${index == 0 ? "active" : ""}`}>
                <div className="bg-img"
                     style={{backgroundImage: `url(${ImageSourceUtil.getUploadedImageSrc(props.contents?.image)})`}}></div>
                <div className="label-shadow"></div>
                <div className="label">
                    <div className="icon">
                        <i className="mdi mdi-walk"></i>
                    </div>
                    <div className="info">
                        <h2 className="main">{props.contents?.title}</h2>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-header">{this.getComponentElementContents("title")?.content}</h2>
                    <p className="section-content">{this.getComponentElementContents("describe")?.content}</p>
                    <div className="categories-container">
                        <div className="options">
                            {
                                this.props.pageData.categories?.map((category, index) => this.Category(category, index))
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
