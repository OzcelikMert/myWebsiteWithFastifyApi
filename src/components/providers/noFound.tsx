import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import ComponentError404 from "components/error/404";

type PageState = {
    
};

type PageProps = {
    children: React.ReactNode
} & PagePropCommonDocument<{}>;

export default class ProviderNoFound extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        if(!this.props.pageData){
            return <ComponentError404 appData={this.props.appData}/>;
        }
        return this.props.children;
    }
}