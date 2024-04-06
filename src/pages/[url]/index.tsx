import React, {Component} from "react";
import {GetServerSidePropsContext} from "next";
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "@utils/page.util";
import {PageTypeId} from "@constants/pageTypes";
import ComponentThemeSelectedComponents from "@components/theme/selectedComponents";

type PageState = {};

type PageProps = {} & IPagePropCommon;

export default class PageURL extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div className="page page-default">
                <ComponentThemeSelectedComponents {...this.props} />
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    await PageUtil.initProps({
        req: req,
        url: context.params?.url as string ?? "",
        typeId: PageTypeId.Default,
        increaseView: true
    });

    return {
        props: PageUtil.getCommonProps(req),
    };
}