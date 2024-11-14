import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { IPagePropCommon } from 'types/pageProps';

type PageState = {};

type PageProps = {
  Component: any;
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
      getURL: this.props.getURL,
    };

    return <this.props.Component {...commonProps} />;
  }
}

export function withCustomProps(Component: any) {
  function ComponentWithCustomProps(props: any) {
    const { t } = useTranslation();
    return <Component {...props} t={t} />;
  }

  return ComponentWithCustomProps;
}

export default withCustomProps(ComponentApp);
