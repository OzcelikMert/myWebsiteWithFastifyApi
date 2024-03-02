import { PagePropCommonDocument } from "types/pageProps";
import {PostGetManyResultDocument} from "types/services/post";
import React, { Component } from "react";
import { GetServerSidePropsContext} from "next";
import HTMLReactParser from "html-react-parser";
import SelectedComponents from "components/selectedComponents";
import pageLib from "lib/page.lib";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{
  services: PostGetManyResultDocument[];
  testimonials: PostGetManyResultDocument[];
  whyUs: PostGetManyResultDocument[];
  clients: PostGetManyResultDocument[];
  blogs: PostGetManyResultDocument[];
}>;

export default class PageURL extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  render() {
    return (
      <div className="page">
        {this.props.pageData?.contents?.content ? (
          <section id="pageContent">
            <div className="container">
              {HTMLReactParser(
                this.props.pageData?.contents?.content || ""
              )}
            </div>
          </section>
        ) : null}
        <SelectedComponents {...this.props} />
      </div>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let req = context.req;

  await pageLib.get(req, context.params?.url as string)

  return {
    props: pageLib.getReturnData(req),
  };
}
