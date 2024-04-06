import React, {Component} from "react";
import Image from "next/image";
import {ImageSourceUtil} from "@utils/imageSource.util";
import {IPostTermGetResultService, IPostTermPopulateService} from "types/services/postTerm.service";
import {IUserPopulateService} from "types/services/user.service";
import {DateMask} from "@library/variable";
import {IPostGetManyResultService} from "types/services/post.service";
import {IPagePropCommon} from "types/pageProps";
import {URLUtil} from "@utils/url.util";

type IPageState = {};

type IPageProps = {
    item: IPostTermGetResultService
    t: IPagePropCommon["t"]
    index?: number
    isSelected?: boolean
    onMouseOver?: (item: IPostTermGetResultService) => void
};

export default class ComponentCategory extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    onMouseOver() {
        if(this.props.onMouseOver){
            this.props.onMouseOver(this.props.item);
        }
    }

    render() {
        return (
            <div key={this.props.item._id} className={`option ${this.props.isSelected ? "active" : ""}`} onMouseOver={event => this.onMouseOver()}>
                <div className="bg-img"
                     style={{backgroundImage: `url(${ImageSourceUtil.getUploadedImageSrc(this.props.item.contents?.image)})`}}></div>
                <div className="label-shadow"></div>
                <div className="label">
                    <div className="icon">
                        <i className="mdi mdi-walk"></i>
                    </div>
                    <div className="info">
                        <h2 className="main">{this.props.item.contents?.title}</h2>
                    </div>
                </div>
            </div>
        );
    }
}
