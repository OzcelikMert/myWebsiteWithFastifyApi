import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ComponentHelperClass} from "classes/componentHelper.class";
import {IPostGetManyResultService} from "types/services/post.service";
import ComponentArticleBlog from "components/elements/articles/blog";
import {IncomingMessage} from "http";
import {PostService} from "services/post.service";
import {PostTypeId} from "constants/postTypes";
import {StatusId} from "constants/status";

type IPageState = {
    hotBlogs: IPostGetManyResultService[];
};

type IPageProps = {
    component: IComponentModel<{ hotBlogs?: IPostGetManyResultService[] }>;
} & IPagePropCommon;

class ComponentThemeHotBlogs extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            hotBlogs: this.props.component.customData?.hotBlogs ?? []
        }
    }

    HotBlog = () => {
        let item = this.state.hotBlogs[0];
        return (
            <section className="recent-blog-section">
                <div className="container">
                    <h2 className="section-header">{this.getComponentElementContents("hotTitle")?.content}</h2>
                    <p className="section-content">{this.getComponentElementContents("hotDescribe")?.content}</p>
                    <div className="d-flex blogs">
                        <div className="row">
                            <ComponentArticleBlog item={item} index={0} t={this.props.t} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    HotBlogs = () => {
        let items = this.state.hotBlogs.filter(((value, index) => index != 0));
        return (
            <section className="featured-blogs-section">
                <div className="container">
                    <h2 className="section-header">{this.getComponentElementContents("hotsTitle")?.content}</h2>
                    <div className="blogs">
                        <div className="row">
                            {
                                items.map(item => (
                                    <ComponentArticleBlog item={item} index={0} t={this.props.t} hideAuthorImage={true} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    render() {
        return this.state.hotBlogs.length < 2 ? null :  (
            <section className="hot-blogs-section">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-lg-8">
                            <this.HotBlog />
                        </div>
                        <div className="col-lg-4 ps-lg-5">
                            <this.HotBlogs />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ComponentThemeHotBlogs.initComponentServersideProps = async (req: IncomingMessage, component) => {
    component.customData = {};
    component.customData.hotBlogs = (await PostService.getMany({
        langId: req.appData.selectedLangId,
        typeId: [PostTypeId.Blog],
        statusId: StatusId.Active,
        count: 4
    })).data;
}

export default ComponentThemeHotBlogs;