import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "../../../classes/componentHelper.class";
import {SocialMediaKey} from "constants/socialMediaKeys";

type IPageState = {};

type IPageProps = {
    component: IComponentModel;
} & IPagePropCommon<{}>;

export default class ComponentThemeFeatures extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    render() {
        return (
            <section className="property-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 text-center cards">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                        <span>
                                          <i style={{color: "blue"}} className={`mdi mdi-${this.getComponentElementContents("featureOneIcon")?.content}`}></i>
                                        </span>
                                            </div>
                                            <h4 className="card-title">{this.getComponentElementContents("featureOneTitle")?.content}</h4>
                                            <p className="card-text">{this.getComponentElementContents("featureOneDescribe")?.content} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                        <span>
                                          <i style={{color: "red"}} className={`mdi mdi-${this.getComponentElementContents("featureTwoIcon")?.content}`}></i>
                                        </span>
                                            </div>
                                            <h4 className="card-title">{this.getComponentElementContents("featureTwoTitle")?.content}</h4>
                                            <p className="card-text">{this.getComponentElementContents("featureTwoDescribe")?.content} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                        <span>
                                          <i style={{color: "orange"}} className={`mdi mdi-${this.getComponentElementContents("featureThreeIcon")?.content}`}></i>
                                        </span>
                                            </div>
                                            <h4 className="card-title">{this.getComponentElementContents("featureThreeTitle")?.content}</h4>
                                            <p className="card-text">{this.getComponentElementContents("featureThreeDescribe")?.content} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                        <span>
                                          <i style={{color: "green"}} className={`mdi mdi-${this.getComponentElementContents("featureFourIcon")?.content}`}></i>
                                        </span>
                                            </div>
                                            <h4 className="card-title">{this.getComponentElementContents("featureFourTitle")?.content}</h4>
                                            <p className="card-text">{this.getComponentElementContents("featureFourDescribe")?.content} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 content ps-lg-5 mt-3 mt-lg-0 d-flex flex-column text-center">
                            <div className="align-items-start">
                                <h1 className="fw-bold">{this.getComponentElementContents("title")?.content}</h1>
                                <p className="fs-6 opacity-75">
                                    {this.getComponentElementContents("describe")?.content}
                                </p>
                                <a href="#" className="btn btn-primary btn-lg mt-3">
                                    <span>{this.getComponentElementContents("buttonText")?.content}</span>
                                </a>
                            </div>
                            <div className="icons mt-auto pt-3">
                                <div className="icon-title">
                                    <h5>{this.getComponentElementContents("socialTitle")?.content}</h5>
                                </div>
                                <a href={this.getSocialMediaURL(SocialMediaKey.Facebook)}><i className="mdi mdi-facebook p-2"></i></a>
                                <a href={this.getSocialMediaURL(SocialMediaKey.Twitter)}><i className="mdi mdi-twitter p-2"></i></a>
                                <a href={this.getSocialMediaURL(SocialMediaKey.Instagram)}><i className="mdi mdi-instagram p-2"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
