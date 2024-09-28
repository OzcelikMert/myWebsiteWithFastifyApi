import React, {Component} from "react";
import {IPagePropCommon} from "types/pageProps";
import ComponentToolError404 from "@components/theme/error404";
import {ComponentKey} from "@constants/componentKeys";

type PageState = {
    
};

type PageProps = {
    children: React.ReactNode
} & IPagePropCommon;

export default class ProviderNoFound extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        if(!this.props.pageData.page){
            let component404 = this.props.appData.toolComponents.findSingle("key", ComponentKey.Error404);
            return component404 ? <ComponentToolError404 component={component404} {...this.props}/> : null;
        }
        return this.props.children;
    }
}