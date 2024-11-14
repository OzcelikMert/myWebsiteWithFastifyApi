import React, { Component } from 'react';
import { GetServerSidePropsContext } from 'next';
import { IPagePropCommon } from 'types/pageProps';
import { PageSSRUtil } from '@utils/page.ssr.util';
import { PageTypeId } from '@constants/pageTypes';
import ComponentThemeSelectedComponents from '@components/theme/selectedComponents';
import ComponentAppLayout from '@components/app/layout';

type PageState = {};

type PageProps = {} & IPagePropCommon;

export default class PageHome extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    return (
      <ComponentAppLayout {...this.props}>
        <div className="page page-home">
          <ComponentThemeSelectedComponents {...this.props} />
        </div>
      </ComponentAppLayout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;

  await PageSSRUtil.init({
    req: req,
    url: 'homepage',
    typeId: PageTypeId.Home,
    increaseView: true,
  });

  return {
    props: PageSSRUtil.getProps(req),
  };
}
