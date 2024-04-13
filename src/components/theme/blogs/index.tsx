import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "@classes/componentHelper.class";
import {IPostGetManyResultService} from "types/services/post.service";
import {PostService} from "@services/post.service";
import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import ComponentBlog from "@components/elements/blog";
import {IPostTermGetResultService} from "types/services/postTerm.service";
import {IBlogsPagePropsParams} from "@pages/blogs";

type IPageState = {
    blogs: IPostGetManyResultService[]
    isLoadingShowMoreButton: boolean
    isActiveShowMoreButton: boolean
};

type IPageProps = {
    component: IComponentModel<{ blogs?: IPostGetManyResultService[], maxBlogCount?: number }>;
} & IPagePropCommon<{
    category?: IPostTermGetResultService
    params: IBlogsPagePropsParams
}>;

const perPageBlogCount = 9;

class ComponentThemeLastBlogs extends ComponentHelperClass<IPageProps, IPageState> {
    pageNumber = 1;

    constructor(props: IPageProps) {
        super(props);
        this.state = {
            blogs: this.props.component.customData?.blogs ?? [],
            isLoadingShowMoreButton: false,
            isActiveShowMoreButton: (this.props.component.customData?.maxBlogCount ?? 0) > (this.props.component.customData?.blogs?.length || 0)
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
                count: perPageBlogCount,
                page: this.pageNumber
            });
            if(serviceResult.status && serviceResult.data){
                this.setState({
                    blogs: [...this.state.blogs, ...serviceResult.data]
                }, () => {
                    this.setState({
                        isActiveShowMoreButton: (this.props.component.customData?.maxBlogCount ?? 0) > this.state.blogs.length
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
                    <div className="blogs">
                        <h5>{this.getComponentElementContents("countMessage")?.content?.replace("{{blogsCount}}", this.props.component.customData?.maxBlogCount?.toString() || "0")}</h5>
                        <div className="row">
                            {
                                this.state.blogs.map((item, index) =>
                                    <ComponentBlog {...this.props} className={`col-md-4 mt-4 mt-md-0 ${index > 2 ? "mt-md-4" : ""}`} item={item} index={index} />
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

    let categoryId = req.pageData.category?._id ?? null;
    let search = req.pageData.params?.search || null;
    let page = req.pageData.params?.page ?? 1;

    component.customData.blogs = (await PostService.getMany({
        langId: req.appData.selectedLangId,
        typeId: [PostTypeId.Blog],
        statusId: StatusId.Active,
        count: perPageBlogCount,
        page: page,
        ...(search ? {title: search} : {}),
        ...(categoryId ? {categories: [categoryId]} : {})
    })).data;
    component.customData.maxBlogCount = (await PostService.getCount({
        typeId: PostTypeId.Blog,
        statusId: StatusId.Active,
        ...(search ? {title: search} : {}),
        ...(categoryId ? {categories: [categoryId]} : {})
    })).data;
}

export default ComponentThemeLastBlogs;
