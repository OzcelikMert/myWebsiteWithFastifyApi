import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "classes/componentHelper.class";
import {IPostGetManyResultService} from "types/services/post.service";
import {PostService} from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";
import ComponentArticleBlog from "components/elements/articles/blog";

type IPageState = {
    lastBlogs: IPostGetManyResultService[]
    isLoadingShowMoreButton: boolean
    isActiveShowMoreButton: boolean
};

type IPageProps = {
    component: IComponentModel<{ lastBlogs?: IPostGetManyResultService[], maxBlogCount?: number }>;
} & IPagePropCommon;

export const lastBlogsPerPageBlogCount = 3;

class ComponentThemeLastBlogs extends ComponentHelperClass<IPageProps, IPageState> {
    pageNumber = 1;

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            lastBlogs: this.props.component.customData?.lastBlogs ?? [],
            isLoadingShowMoreButton: false,
            isActiveShowMoreButton: true
        }
    }

    async onClickShowMore() {
        if(!this.state.isActiveShowMoreButton) return false;
        this.setState({
            isLoadingShowMoreButton: true
        }, async () => {
            this.pageNumber += 1;
            let serviceResult = await PostService.getMany({
                langId: this.props.appData.selectedLangId,
                typeId: [PostTypeId.Blog],
                statusId: StatusId.Active,
                count: lastBlogsPerPageBlogCount,
                page: this.pageNumber
            });
            if(serviceResult.status && serviceResult.data){
                this.setState({
                    lastBlogs: [...this.state.lastBlogs, ...serviceResult.data]
                }, () => {
                    this.setState({
                        isActiveShowMoreButton: (this.props.component.customData?.maxBlogCount ?? 0) > this.state.lastBlogs.length
                    })
                })
            }
            this.setState({
                isLoadingShowMoreButton: false
            })
        })
    }

    render() {
        return (
            <section className="blogs-section">
                <div className="container">
                    <h2 className="section-header">{this.getComponentElementContents("title")?.content}</h2>
                    <p className="section-content">{this.getComponentElementContents("describe")?.content}</p>
                    <div className="blogs">
                        <div className="row">
                            {
                                this.state.lastBlogs.map((item, index) =>
                                    <ComponentArticleBlog item={item} index={index} t={this.props.t} />
                                )
                            }
                        </div>
                    </div>
                    <div className="w-100 pt-5 text-center show-more">
                        {
                            this.state.isActiveShowMoreButton
                                ? <button className="btn btn-outline-primary btn-lg" onClick={event => this.onClickShowMore()} disabled={this.state.isLoadingShowMoreButton}>
                                        {this.state.isLoadingShowMoreButton ? (<i className="fa fa-spinner fa-spin me-1"></i>) : null}
                                        <span>{this.getComponentElementContents("buttonText")?.content}</span>
                                </button> : null
                        }
                    </div>
                </div>
            </section>
        );
    }
}

ComponentThemeLastBlogs.initComponentServersideProps = async (req, component) => {
    component.customData = {};
    component.customData.lastBlogs = (await PostService.getMany({
        langId: req.appData.selectedLangId,
        typeId: [PostTypeId.Blog],
        statusId: StatusId.Active,
        count: lastBlogsPerPageBlogCount,
        page: 1,
    })).data;
    component.customData.maxBlogCount = (await PostService.getCount({
        typeId: PostTypeId.Blog,
        statusId: StatusId.Active,
    })).data;
}

export default ComponentThemeLastBlogs;
