import React from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import {ImageSourceUtil} from "@utils/imageSource.util";
import {IPostTermGetResultService} from "types/services/postTerm.service";
import {ComponentHelperClass} from "@classes/componentHelper.class";
import {PostTypeId} from "@constants/postTypes";
import {StatusId} from "@constants/status";
import {PostTermService} from "@services/postTerm.service";
import {PostTermTypeId} from "@constants/postTermTypes";
import ComponentCategory from "@components/elements/category";

type IPageState = {
    selectedCategoryId: string
};

type IPageProps = {
    component: IComponentModel<{categories?: IPostTermGetResultService[]}>;
} & IPagePropCommon;

class ComponentThemeHotCategories extends ComponentHelperClass<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
        this.state = {
            selectedCategoryId: ""
        }
    }

    onMouseOver = (item: IPostTermGetResultService) => {
        this.setState({
            selectedCategoryId: item._id
        })
    }

    render() {
        return (
            <section className="categories-section hot-categories-section">
                <div className="container">
                    <h2 className="section-header">{this.getComponentElementContents("title")?.content}</h2>
                    <p className="section-content">{this.getComponentElementContents("describe")?.content}</p>
                    <div className="categories-container">
                        <div className="options">
                            {
                                this.props.component.customData?.categories?.map((category, index) =>
                                    <ComponentCategory
                                        item={category}
                                        t={this.props.t}
                                        index={index}
                                        onMouseOver={item => this.onMouseOver(item)}
                                        isSelected={
                                            (this.state.selectedCategoryId == "" && index == 0) ||
                                            category._id == this.state.selectedCategoryId
                                        }
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ComponentThemeHotCategories.initComponentServersideProps = async (req, component) => {
    component.customData = {};
    component.customData.categories = (await PostTermService.getMany({
        langId: req.appData.selectedLangId,
        typeId: [PostTermTypeId.Category],
        postTypeId: PostTypeId.Blog,
        statusId: StatusId.Active,
        count: 5
    })).data;
}

export default ComponentThemeHotCategories;
