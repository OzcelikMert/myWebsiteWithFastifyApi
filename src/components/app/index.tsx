import React, {Component} from "react";
import {useTranslation} from "react-i18next";
import ProviderNoFound from "components/providers/noFound";
import ComponentHead from "components/head";
import {IPagePropCommon} from "types/pageProps";
import ComponentToolSubscribe from "components/tools/subscribe";
import {ComponentKey} from "constants/componentKeys";

type PageState = {};

type PageProps = {
    Component: any
} & IPagePropCommon;

class ComponentApp extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        const commonProps: IPagePropCommon = {
            router: this.props.router,
            t: this.props.t,
            appData: this.props.appData,
            pageData: this.props.pageData,
            cookies: this.props.cookies,
            getURL: this.props.getURL
        };

        let subscribeComponent = this.props.appData.toolComponents.findSingle("elementId", ComponentKey.Subscribe);

        return (
            <div>
                <ComponentHead {...commonProps} />
                <div className="container-fluid main-section" id="main-section">
                    <ProviderNoFound {...commonProps}>
                        <div className="page-content">
                            <this.props.Component {...commonProps} />
                        </div>
                    </ProviderNoFound>
                    {
                        subscribeComponent
                            ? <ComponentToolSubscribe component={subscribeComponent} {...commonProps} />
                            : null
                    }
                </div>
            </div>
        );
    }
}


export function withCustomProps(Component: any) {
    function ComponentWithCustomProps(props: any) {
        let {t} = useTranslation();
        return (
            <Component
                {...props}
                t={t}
            />
        );
    }

    return ComponentWithCustomProps;
}

export default withCustomProps(ComponentApp);