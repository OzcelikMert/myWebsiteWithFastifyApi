import React, {Component} from "react";
import Head from 'next/head'
import Variable from "library/variable";
import {IPagePropCommon} from "types/pageProps";
import {ImageSourceUtil} from "utils/imageSource.util";
import {LanguageUtil} from "utils/language.util";
import {URLUtil} from "utils/url.util";

type PageState = {};

type PageProps = {} & IPagePropCommon<{}>;

export default class ComponentHead extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    get getKeywords() {
        let keywords: string[] = [];

        if(
            this.props.pageData.page &&
            this.props.pageData.page.tags &&
            this.props.pageData.page.tags.length > 0
        ){
            keywords = this.props.pageData.page.tags.map(tag => tag?.contents?.title).filter(tag => tag) as string[];
        } else if(
            this.props.appData.settings.seoContents?.tags &&
            this.props.appData.settings.seoContents.tags.length > 0
        ) {
            keywords = this.props.appData.settings.seoContents.tags;
        }

        return keywords.join(",")
    }

    get getAlternates() {
        return this.props.pageData.page?.alternates?.map(alternate => {
            let language = this.props.appData.languages.findSingle("_id", alternate.langId);
            if(language){
                return (
                    <link rel="alternate" hrefLang={LanguageUtil.getCode(language)} href={URLUtil.replaceLanguageCode({
                        url: this.props.getURL,
                        newLanguage: language,
                        withBase: true
                    })} />
                )
            }
        })
    }

    get getFacebookAlternates() {
        return this.props.pageData.page?.alternates?.map(alternate => {
            let language = this.props.appData.languages.findSingle("_id", alternate.langId);
            if(language){
                return (
                    <meta property="og:locale:alternate" content={LanguageUtil.getCode(language, "_", true)} />
                )
            }
        })
    }

    render() {
        let pageData = this.props.pageData;
        let appData = this.props.appData;
        let title = `${appData.settings.seoContents?.title}${!Variable.isEmpty(pageData.page?.contents?.title) ? ` | ${pageData.page?.contents?.title}` : ""}`;
        let desc = pageData.page?.contents?.shortContent || appData.settings.seoContents?.content || "";
        let logo = ImageSourceUtil.getUploadedImageSrc(appData.settings.logo)
        let language = this.props.appData.languages.findSingle("_id", this.props.appData.selectedLangId);

        return (
            <Head>
                <title>{title}</title>

                <meta name="description" content={desc} />
                <meta name="copyright" content={appData.settings.seoContents?.title} />
                <meta name="author" content="Özçelik Software" />
                <meta name="keywords" content={this.getKeywords} />
                {this.getAlternates}

                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={desc} />
                <meta itemProp="image" content={logo} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content={ this.props.getURL.full} />
                <meta property="og:description" content={desc} />
                <meta property="og:site_name" content={title} />
                <meta property="og:image" content={logo} />
                <meta property="og:locale" content={language ? LanguageUtil.getCode(language, "_", true) : ""} />
                {this.getFacebookAlternates}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:url" content={this.props.getURL.full} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={logo} />
            </Head>
        );
    }
}