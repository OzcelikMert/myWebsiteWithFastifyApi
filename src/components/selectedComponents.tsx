import React, { Component } from "react";

import {PagePropCommonDocument} from "types/pageProps";
import ThemeServices from "components/theme/services";
import ThemeWhyUs from "components/theme/whyUs";
import ThemeTestimonials from "components/theme/testimonials";
import ThemeClients from "components/theme/clients";
import ThemeContactForm from "components/theme/contactForm";
import ThemeAbout from "components/theme/about";
import ThemeProducts from "components/theme/products";
import ThemeContact from "components/theme/contact";
import ComponentError404 from "components/error/404";
import ThemeTeam from "components/theme/team";
import ThemeBlogs from "components/theme/lastBlogs";
import ThemeBeforeAndAfters from "components/theme/beforeAndAfters";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

class SelectedComponents extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    getComponent = (elementId: string) => {
        let element = (<div></div>);

        switch (elementId) {
            case "about":
                element = (<ThemeAbout {...this.props} />);
                break;
            case "services":
                element = (<ThemeServices {...this.props} />);
                break;
            case "whyUs":
                element = (<ThemeWhyUs {...this.props} />);
                break;
            case "testimonials":
                element = (<ThemeTestimonials {...this.props} />);
                break;
            case "products":
                element = (<ThemeProducts {...this.props} />);
                break;
            case "clients":
                element = (<ThemeClients {...this.props} />);
                break;
            case "contactForm":
                element = (<ThemeContactForm {...this.props} />);
                break;
            case "contact":
                element = (<ThemeContact {...this.props} />);
                break;
            case "notFound":
                element = (<ComponentError404 {...this.props} />);
                break;
            case "team":
                element = (<ThemeTeam {...this.props} />);
                break;
            case "blogs":
                element = (<ThemeBlogs {...this.props} />);
                break;
            case "beforeAndAfters":
                element = (<ThemeBeforeAndAfters {...this.props} />);
                break;
        }

        return element;
    }

    render() {
        return this.props.pageData?.components?.map(component => this.getComponent(component.elementId))
    }
}

export default SelectedComponents;
