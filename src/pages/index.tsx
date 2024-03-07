import React, {Component} from "react";
import {GetServerSidePropsContext} from 'next'
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "utils/page.util";
import {PageTypeId} from "constants/pageTypes";
import {PostService} from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import {IPostGetManyResultService} from "types/services/post.service";
import {PathUtil} from "utils/path.util";

type PageState = {};

type PageProps = {
    components: any[]
} & IPagePropCommon<{ blogs: IPostGetManyResultService[] }>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props)
    }

    Blog = (props: IPostGetManyResultService) => {
        return (
            <div>
                <a href={`/${props.contents?.url}`} className="href">/{props.contents?.title}</a><br/>
                <a href={`${props.contents?.url}`} className="href">{props.contents?.title}</a>
                <div>{props.contents?.content}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="page page-home">
                {
                    this.props.pageData.blogs.map(blog =>
                        <this.Blog {...blog} />
                    )
                }
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let req = context.req;

    await PageUtil.get(req, "homepage", PageTypeId.HomePage);

    req.pageData.blogs = (await PostService.getMany({
        langId: req.appData.selectedLangId,
        typeId: [PostTypeId.Blog],
        statusId: StatusId.Active
    })).data;

    return {
        props: PageUtil.getPropCommon(req),
    };
}