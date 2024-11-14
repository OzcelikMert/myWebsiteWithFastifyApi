import React, { Component } from 'react';
import { GetServerSidePropsContext } from 'next';
import { IPagePropCommon } from 'types/pageProps';
import { PageSSRUtil } from '@utils/page.ssr.util';
import { PageTypeId } from '@constants/pageTypes';
import ComponentThemeSelectedComponents from '@components/theme/selectedComponents';
import ComponentAppLayout from '@components/app/layout';

type PageState = {};

type PageProps = {} & IPagePropCommon<{ url?: string }>;

export default class PageURL extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    return (
      <ComponentAppLayout
        {...this.props}
        pageTitle={`${this.props.pageData.page?.contents?.title || this.props.pageData.url}`}
      >
        <div className="page page-default">
          <ComponentThemeSelectedComponents {...this.props} />
        </div>
      </ComponentAppLayout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;

  const url = (context.params?.url as string) || '';
  req.pageData.url = decodeURI(url);

  await PageSSRUtil.init({
    req: req,
    url: url,
    typeId: PageTypeId.Default,
    increaseView: true,
  });

  return {
    props: PageSSRUtil.getProps(req),
  };
}
