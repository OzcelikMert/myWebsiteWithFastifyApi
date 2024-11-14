import React, { Component } from 'react';
import Head from 'next/head';
import { IPagePropCommon } from 'types/pageProps';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { LanguageUtil } from '@utils/language.util';
import { UrlUtil } from '@utils/url.util';
import HTMLReactParser from 'html-react-parser';

type PageState = {};

type PageProps = {
  title?: string;
} & IPagePropCommon;

export default class ComponentHead extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  get getTitle() {
    let title = this.props.appData.settings.seoContents?.title;
    if (this.props.title) {
      title = `${title} | ${this.props.title}`;
    } else if (this.props.pageData.page) {
      title = `${title} | ${this.props.pageData.page.contents?.title}`;
    }
    return title;
  }

  get getKeywords() {
    let keywords: string[] = [];

    if (
      this.props.pageData.page &&
      this.props.pageData.page.tags &&
      this.props.pageData.page.tags.length > 0
    ) {
      keywords = this.props.pageData.page.tags
        .map((tag) => tag?.contents?.title)
        .filter((tag) => tag) as string[];
    } else if (
      this.props.appData.settings.seoContents?.tags &&
      this.props.appData.settings.seoContents.tags.length > 0
    ) {
      keywords = this.props.appData.settings.seoContents.tags;
    }

    return keywords.join(',');
  }

  get getAlternates() {
    return this.props.pageData.page?.alternates?.map((alternate) => {
      const language = this.props.appData.languages.findSingle(
        '_id',
        alternate.langId
      );
      if (language) {
        return (
          <link
            rel="alternate"
            hrefLang={LanguageUtil.getCode(language)}
            href={UrlUtil.replaceLanguageCode({
              url: this.props.getURL,
              newLanguage: language,
              withBase: true,
            })}
          />
        );
      }
    });
  }

  get getFacebookAlternates() {
    return this.props.pageData.page?.alternates?.map((alternate) => {
      const language = this.props.appData.languages.findSingle(
        '_id',
        alternate.langId
      );
      if (language) {
        return (
          <meta
            property="og:locale:alternate"
            content={LanguageUtil.getCode(language, '_', true)}
          />
        );
      }
    });
  }

  render() {
    const pageData = this.props.pageData;
    const appData = this.props.appData;
    const title = this.getTitle;
    const desc =
      pageData.page?.contents?.shortContent ||
      appData.settings.seoContents?.content ||
      '';
    const logo = ImageSourceUtil.getUploadedImageSrc(appData.settings.logo);
    const language = this.props.appData.languages.findSingle(
      '_id',
      this.props.appData.selectedLangId
    );

    return (
      <Head>
        <title>{title}</title>
        <link
          rel="shortcut icon"
          href={ImageSourceUtil.getUploadedImageSrc(appData.settings.icon)}
        />
        <link rel="canonical" href={this.props.getURL.full} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {pageData.page?.isNoIndex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : null}
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
        <meta property="og:url" content={this.props.getURL.full} />
        <meta property="og:description" content={desc} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={logo} />
        <meta
          property="og:locale"
          content={language ? LanguageUtil.getCode(language, '_', true) : ''}
        />
        {this.getFacebookAlternates}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:url" content={this.props.getURL.full} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={logo} />
        {appData.settings.head ? HTMLReactParser(appData.settings.head) : null}
        {appData.settings.script
          ? HTMLReactParser(appData.settings.script)
          : null}
      </Head>
    );
  }
}
