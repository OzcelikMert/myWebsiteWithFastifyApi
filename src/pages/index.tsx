import React, {Component} from "react";
import {GetServerSidePropsContext} from 'next'
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "@utils/page.util";
import {PageTypeId} from "@constants/pageTypes";
import {IPostGetManyResultService} from "types/services/post.service";
import ComponentThemeSelectedComponents from "@components/theme/selectedComponents";
import ComponentAppLayout from "@components/app/layout";

type PageState = {};

type PageProps = {} & IPagePropCommon<{ sliders?: IPostGetManyResultService[] }>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <ComponentAppLayout {...this.props}>
                <div className="page page-home">
                    <ComponentThemeSelectedComponents {...this.props} />
                </div>
            </ComponentAppLayout>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    await PageUtil.initProps({req: req,
        url: "homepage",
        typeId: PageTypeId.Home,
        increaseView: true
    });

    return {
        props: PageUtil.getCommonProps(req),
    };
}