import React, { Component } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { NEXT_DATA } from 'next/dist/shared/lib/utils';
import { IPagePropCommon } from 'types/pageProps';
import { LanguageUtil } from '@utils/language.util';

type PageState = {};

type PageProps = {
  __NEXT_DATA__: Omit<NEXT_DATA, 'props'> & {
    props: { pageProps: IPagePropCommon<{}> };
  };
};

export default class HTMLDocument extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    const appData = this.props.__NEXT_DATA__.props.pageProps.appData;
    const language = appData.languages.findSingle(
      '_id',
      appData.selectedLangId
    );
    return (
      <Html
        lang={language ? LanguageUtil.getCode(language, '_', true) : 'en_US'}
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
