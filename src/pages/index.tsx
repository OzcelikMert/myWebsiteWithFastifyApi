import {PagePropCommonDocument} from "types/pageProps";
import React, {Component} from "react";
import {GetServerSidePropsContext} from 'next'
import "styles/pages/home.module.scss";
import ComponentCarousel from "components/theme/carousel";
import SelectedComponents from "components/selectedComponents";
import postService from "services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "constants/index";
import {PostGetManyResultDocument} from "types/services/post";
import pageLib from "lib/page.lib";

type PageState = {};

type PageProps = {
    components: any[]
} & PagePropCommonDocument<{ sliders: PostGetManyResultDocument[] }>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div className="page page-home">
                <ComponentCarousel {...this.props}/>
                <SelectedComponents {...this.props} />
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    await pageLib.get(req, "", PageTypeId.HomePage)

    req.themeData.sliders = (await postService.getMany({
        langId: req.appData.languageId,
        typeId: [PostTypeId.Slider],
        statusId: StatusId.Active
    })).data;

    return {
        props: pageLib.getReturnData(req),
    };
}