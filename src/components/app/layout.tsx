import React, { Component } from 'react';
import ProviderNoFound from '@components/providers/noFound';
import ComponentHead from '@components/head';
import { IPagePropCommon } from 'types/pageProps';
import ComponentThemeSubscribe from '@components/theme/subscribe';
import { ComponentKey } from '@constants/componentKeys';
import ComponentThemeFooter from '@components/theme/footer';
import ComponentThemeNavbar from '@components/theme/navbar';
import ComponentThemeHeader from '@components/theme/header';

type PageState = {};

type PageProps = {
  children: React.ReactNode;
  pageTitle?: string;
  headerBgImage?: string;
  headerContent?: string;
  headerButtons?: JSX.Element;
} & IPagePropCommon;

export default class ComponentAppLayout extends Component<
  PageProps,
  PageState
> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    const subscribeComponent = this.props.pageData.publicComponents?.findSingle(
      'key',
      ComponentKey.Subscribe
    );
    const footerComponent = this.props.pageData.publicComponents?.findSingle(
      'key',
      ComponentKey.Footer
    );
    const navbarComponent = this.props.pageData.publicComponents?.findSingle(
      'key',
      ComponentKey.Navbar
    );
    const videoHeaderComponent =
      this.props.pageData.publicComponents?.findSingle(
        'key',
        ComponentKey.Header
      );

    return (
      <div>
        <ComponentHead {...this.props} title={this.props.pageTitle} />
        {navbarComponent ? (
          <ComponentThemeNavbar component={navbarComponent} {...this.props} />
        ) : null}
        <div className="container-fluid main-section" id="main-section">
          <div className="page-content">
            {videoHeaderComponent ? (
              <ComponentThemeHeader
                {...this.props}
                component={videoHeaderComponent}
                title={this.props.pageTitle}
                backgroundImage={this.props.headerBgImage}
                content={this.props.headerContent}
                buttons={this.props.headerButtons}
              />
            ) : null}
            <ProviderNoFound {...this.props}>
              {this.props.children}
            </ProviderNoFound>
          </div>
          {subscribeComponent ? (
            <ComponentThemeSubscribe
              component={subscribeComponent}
              {...this.props}
            />
          ) : null}
          {footerComponent ? (
            <ComponentThemeFooter component={footerComponent} {...this.props} />
          ) : null}
        </div>
      </div>
    );
  }
}
