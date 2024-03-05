import React, {Component} from "react";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import ProviderNoFound from "components/providers/noFound";
import ComponentHead from "components/head";
import {IPagePropCommon} from "types/pageProps";
import {ImageSourceUtil} from "utils/imageSource.util";

type PageState = {};

type PageProps = {
    Component: any
} & IPagePropCommon<{}>;

class ComponentApp extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        const commonProps: IPagePropCommon<{}> = {
            router: this.props.router,
            t: this.props.t,
            appData: this.props.appData,
            pageData: this.props.pageData,
            cookies: this.props.cookies,
        };

        return (
            <div>
                <Head>
                    <link rel="shortcut icon" href={ImageSourceUtil.getUploadedImageSrc(commonProps.appData.settings.icon)}/>
                    <link rel="canonical" href={commonProps.appData.apiPath.website.full}/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <ProviderNoFound {...commonProps}>
                    <ComponentHead {...commonProps} />
                    <div className="page-content">
                        <this.props.Component {...commonProps} />
                    </div>
                </ProviderNoFound>
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