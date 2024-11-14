import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import ComponentThemeError404 from '@components/theme/error404';
import { ComponentKey } from '@constants/componentKeys';

type PageState = {};

type PageProps = {
  children: React.ReactNode;
} & IPagePropCommon;

export default class ProviderNoFound extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    if (!this.props.pageData.page) {
      const component404 = this.props.pageData.publicComponents.findSingle(
        'key',
        ComponentKey.Error404
      );
      return component404 ? (
        <ComponentThemeError404 component={component404} {...this.props} />
      ) : null;
    }
    return this.props.children;
  }
}
