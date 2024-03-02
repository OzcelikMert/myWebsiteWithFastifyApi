import React, {Component} from "react";
import {PostTermGetResultDocument} from "types/services/postTerm";
import linkUtil from "utils/link.util";
import {PagePropCommonDocument} from "types/pageProps";
import i18Lib from "lib/i18.lib";

type PageState = {};

type PageProps = {
    items: PostTermGetResultDocument[]
    appData: PagePropCommonDocument<{}>["appData"]
    pagePath: {category(url?: (string | undefined)) : {self(): string}}
    url?: string
};

export default class ThemeWidgetCategories extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    getURL(url: string) {
        return linkUtil.target(this.props.appData, this.props.pagePath.category(url).self());
    }

    Item = (item: PostTermGetResultDocument) => {
        let subItems = this.props.items.findMulti("mainId._id", item._id);
        let classNamesSelected = "fw-bold pe-none";

        return (
            <li className="list-group-item">
                <a className={this.props.url == item.contents?.url ? classNamesSelected : ""} href={this.getURL(item.contents?.url || "")}>{item.contents?.title}</a>
                <span className="badge bg-primary rounded-pill float-end">{item.postCount}</span>
                {
                    subItems.length > 0
                        ? <ul className="list-group children">
                            {
                                subItems.map(subItem => <this.Item {...subItem} />)
                            }
                        </ul> : null
                }
            </li>
        )
    }

    render() {
        return (
            <div className="card widget widget-categories">
                <div className="card-body">
                    <h3>{i18Lib.get("categories")}</h3>
                    <ul className="list-group">
                        {
                            this.props.items.map(item => !item.mainId ? <this.Item {...item} /> : null)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
