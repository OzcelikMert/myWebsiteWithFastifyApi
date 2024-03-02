import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import HandleForm from "library/react/handles/form";
import linkUtil from "utils/link.util";
import pagePaths from "constants/pagePaths";
import Variable from "library/variable";

type PageState = {
    currentPage: number
};

type PageProps = {
    appData: PagePropCommonDocument<{}>["appData"],
    router: PagePropCommonDocument<{}>["router"],
    max: number,
    pagePath: {page(page?: (string | number | undefined)): string}
};

export default class ComponentPagination extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            currentPage: Number(this.props.router.query?.page || 1)
        }
    }

    getURL(page: number) {
        return linkUtil.target(this.props.appData, this.props.pagePath.page(page));
    }

    Item = (props: {text: any, page: number, isDisabled: boolean, isShowActiveBG?: false}) => {
        return (
            <li className={`page-item ${props.isDisabled ? "active" : ""} ${props.isDisabled && typeof props.isShowActiveBG !== "undefined" ? "disabled" : ""}`}>
                <a className={`page-link ${props.isDisabled ? "pe-none" : ""}`} href={this.getURL(props.page)}>
                    {props.text}
                </a>
            </li>
        )
    }

    render() {
        return (
            <nav className="mt-5">
                <ul className="pagination justify-content-center">
                    <this.Item text={(<i className="mdi mdi-chevron-double-left"></i>)} page={1} isDisabled={this.state.currentPage == 1} isShowActiveBG={false} />
                    {
                        this.state.currentPage - 2 > 0
                            ? <this.Item text={this.state.currentPage - 2} page={this.state.currentPage - 2} isDisabled={false} />
                            : null
                    }
                    {
                        this.state.currentPage - 1 > 0
                            ? <this.Item text={this.state.currentPage - 1} page={this.state.currentPage - 1} isDisabled={false} />
                            : null
                    }
                    <this.Item text={this.state.currentPage} page={this.state.currentPage} isDisabled={true} />
                    {
                        this.state.currentPage + 1 <= this.props.max
                            ? <this.Item text={this.state.currentPage + 1} page={this.state.currentPage + 1} isDisabled={false} />
                            : null
                    }
                    {
                        this.state.currentPage + 2 <= this.props.max
                            ? <this.Item text={this.state.currentPage + 2} page={this.state.currentPage + 2} isDisabled={false} />
                            : null
                    }
                    <this.Item text={(<i className="mdi mdi-chevron-double-right"></i>)} page={this.props.max} isDisabled={this.state.currentPage == this.props.max} isShowActiveBG={false} />
                </ul>
            </nav>
        );
    }
}
