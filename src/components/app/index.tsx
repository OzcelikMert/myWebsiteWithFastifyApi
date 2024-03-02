import {PagePropCommonDocument} from "types/pageProps";
import React, {Component} from "react";
import Head from "next/head";
import imageSourceUtil from "utils/imageSource.util";
import ProviderNoFound from "components/providers/noFound";
import ComponentHead from "components/head";
import Navbar from "components/tools/navbar";
import BackToTop from "components/tools/backToTop";
import Footer from "components/tools/footer";

type PageState = {};

type PageProps = {
    Component: any
} & PagePropCommonDocument<{}>;

class ComponentApp extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        const commonProps: PagePropCommonDocument<{}> = {
            router: this.props.router,
            themeData: this.props.themeData,
            appData: this.props.appData,
            pageData: this.props.pageData
        };

        return (
            <div>
                <Head>
                    <link rel="shortcut icon"
                          href={imageSourceUtil.getUploadedImageSrc(commonProps.appData.settings.icon, commonProps.appData.apiPath.uploads)}/>
                    <link rel="canonical" href={commonProps.appData.apiPath.website.full}/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <ProviderNoFound {...commonProps}>
                    <ComponentHead {...commonProps} />
                    <Navbar {...commonProps} />
                    <BackToTop {...commonProps} />
                    <div className="page-content">
                        <this.props.Component {...commonProps} />
                    </div>
                    <Footer {...commonProps} />
                </ProviderNoFound>
            </div>
        );
    }
}


export function withCustomProps(Component: any) {
    function ComponentWithCustomProps(props: any) {
        return (
            <Component
                {...props}
            />
        );
    }

    return ComponentWithCustomProps;
}

export default withCustomProps(ComponentApp);