import React, {Component} from "react";
import {GetServerSidePropsContext} from 'next'
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "utils/page.util";
import {PageTypeId} from "constants/pageTypes";
import {PostService} from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {IPostGetManyResultService} from "types/services/post.service";

type PageState = {};

type PageProps = {
    components: any[]
} & IPagePropCommon<{ blogs: string[] }>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    Blog = (props: IPostGetManyResultService) => {
        return (
            <div>
                <div>{props.contents?.title}</div>
                <div>{props.contents?.content}</div>
            </div>
        );
    }

    render() {
        console.log(this.props)
        return (
            <div className="page page-home">
                {}
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    await PageUtil.get(req, "", PageTypeId.HomePage)

    req.pageData.blogs = (await PostService.getMany({
        langId: req.appData.languageId,
        typeId: [PostTypeId.Blog],
        statusId: StatusId.Active
    })).data;

    return {
        props: PageUtil.getReturnData(req),
    };
}