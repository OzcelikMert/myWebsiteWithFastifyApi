import React, { Component } from "react";
import { GetServerSidePropsContext} from "next";
import {IPagePropCommon} from "types/pageProps";
import {PageUtil} from "utils/page.util";
import {URLUtil} from "utils/url.util";

type PageState = {};

type PageProps = {} & IPagePropCommon<{}>;

export default class PageURL extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    return (
      <div className="page">
        <a href={URLUtil.createHref({url: this.props.getURL})} className="href">Anasayfa</a><br/>
      </div>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let req = context.req;

  return {
    props: PageUtil.getCommonProps(req),
  };
}
