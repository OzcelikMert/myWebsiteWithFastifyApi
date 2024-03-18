import React, {Component} from "react";
import {IComponentModel} from "types/models/component.model";
import {IPagePropCommon} from "types/pageProps";
import ComponentThemeHero from "components/theme/hero";
import ComponentThemeHotCategories from "components/theme/hotCategories";
import {ComponentKey} from "constants/componentKeys";
import ComponentThemeFeatures from "components/theme/features";
import ComponentThemeLastBlogs from "components/theme/lastBlogs";

type IPageState = {};

type IPageProps = {} & IPagePropCommon;

export default class ComponentThemeSelectedComponents extends Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);
    }

    getElement = (component: IComponentModel) => {
        let element = (<div></div>);

        switch (component.elementId) {
            case ComponentKey.Hero:
                element = (<ComponentThemeHero component={component} {...this.props} />);
                break;
            case ComponentKey.HotCategories:
                element = (<ComponentThemeHotCategories component={component} {...this.props} />);
                break;
            case ComponentKey.FeaturesSection:
                element = (<ComponentThemeFeatures component={component} {...this.props} />);
                break;
            case ComponentKey.LastBlogs:
                element = (<ComponentThemeLastBlogs component={component} {...this.props} />);
                break;
        }

        return element;
    }

    render() {
        return this.props.pageData?.page?.components?.map(component => this.getElement(component))
    }
}
