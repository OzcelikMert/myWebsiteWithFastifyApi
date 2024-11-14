import React, { Component } from 'react';
import { IPagePropCommon } from 'types/pageProps';
import ComponentThemeError404 from '@components/theme/error404';
import ComponentAppLayout from '@components/app/layout';
import { ComponentKey } from '@constants/componentKeys';

type PageState = {};

type PageProps = {} & IPagePropCommon;

export default class Page404 extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    const component404 = this.props.pageData.publicComponents.findSingle(
      'key',
      ComponentKey.Error404
    );
    return (
      <ComponentAppLayout {...this.props} pageTitle={`404`}>
        <div className="page page-404">
          {component404 ? (
            <ComponentThemeError404 component={component404} {...this.props} />
          ) : null}
        </div>
      </ComponentAppLayout>
    );
  }
}
