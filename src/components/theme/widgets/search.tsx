import React, {Component} from "react";
import {PagePropCommonDocument} from "types/pageProps";
import HandleForm from "library/react/handles/form";
import linkUtil from "utils/link.util";
import Variable from "library/variable";
import i18Lib from "lib/i18.lib";

type PageState = {
    search: string
};

type PageProps = {
    appData: PagePropCommonDocument<{}>["appData"],
    pagePath: {self(): string, search(url?: (string | undefined)): {self(): string}}
    url?: string
};

export default class ThemeWidgetSearch extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            search: this.props.url || ""
        }
    }

    get getURL() {
        let url = this.props.pagePath.search(this.state.search).self();
        if(Variable.isEmpty(this.state.search)){
            url = this.props.pagePath.self();
        }
        return linkUtil.target(this.props.appData, url);
    }

    render() {
        return (
            <div className="card widget widget-search">
                <div className="card-body">
                    <h3>{i18Lib.get("search")}</h3>
                    <form target="_self" action={this.getURL} method="POST">
                        <div className="input-group">
                            <input
                                name="search"
                                type="search"
                                className="form-control"
                                placeholder={i18Lib.get("search")}
                                onChange={e => HandleForm.onChangeInput(e, this)}
                                value={this.state.search}
                            />
                            <button type={"submit"} className="input-group-text"><i className="mdi mdi-search-web"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
