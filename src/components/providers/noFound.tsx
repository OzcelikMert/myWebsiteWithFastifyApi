import React, {Component} from "react";
import {IPagePropCommon} from "types/pageProps";
import ComponentError404 from "components/error/404";

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
            return <ComponentError404 {...this.props}/>;
        }
        return this.props.children;
    }
}