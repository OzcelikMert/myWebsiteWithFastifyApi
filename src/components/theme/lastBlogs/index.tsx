import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "@classes/componentHelper.class";
import {IPostGetManyResultService} from "types/services/post.service";
import {PostService} from "@services/post.service";
import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import ComponentBlog from "@components/elements/blog";
import ComponentLoadingButton from "@components/elements/button/loadingButton";

type IPageState = {
    lastBlogs: IPostGetManyResultService[]
    isActiveShowMoreButton: boolean
};

type IPageProps = {
    component: IComponentModel<{ lastBlogs?: IPostGetManyResultService[], maxBlogCount?: number }>;
} & IPagePropCommon;

const perPageBlogCount = 3;

class ComponentThemeLastBlogs extends ComponentHelperClass<IPageProps, IPageState> {
    pageNumber = 1;

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            lastBlogs: this.props.component.customData?.lastBlogs ?? [],
            isActiveShowMoreButton: true
        }
    }

    async onClickShowMore() {
        if(!this.state.isActiveShowMoreButton) return false;
        this.pageNumber += 1;
        let serviceResult = await PostService.getMany({
            langId: this.props.appData.selectedLangId,
            typeId: [PostTypeId.Blog],
            statusId: StatusId.Active,
            count: perPageBlogCount,
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
                                    <ComponentBlog {...this.props} className={`col-md-4 mt-4 mt-md-0 ${index > 2 ? "mt-md-4" : ""}`} item={item} index={index} />
                                )
                            }
                        </div>
                    </div>
                    <div className="w-100 pt-5 text-center show-more">
                        {
                            this.state.isActiveShowMoreButton
                                ? <ComponentLoadingButton text={this.props.t("showMore")} onClick={() => this.onClickShowMore()} />
                                : null
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
        count: perPageBlogCount,
        page: 1,
    })).data;
    component.customData.maxBlogCount = (await PostService.getCount({
        typeId: PostTypeId.Blog,
        statusId: StatusId.Active,
    })).data;
}

export default ComponentThemeLastBlogs;
