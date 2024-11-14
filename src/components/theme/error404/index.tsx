import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';

type PageState = {};

type PageProps = {
  component: IComponentGetResultService;
} & IPagePropCommon;

export default class ComponentThemeError404 extends ComponentHelperClass<
  PageProps,
  PageState
> {
  constructor(props: PageProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <i className="bi bi-exclamation-triangle triangle-color display-1"></i>
                <h1 className="display-1 font">404</h1>
                <h1 className="mb-4 font">
                  {this.getComponentElementContents('title')?.content}
                </h1>
                <p className="mb-4 desc">
                  {this.getComponentElementContents('describe')?.content}
                </p>
                <a className="btn btn-outline-primary btn-lg" href="/">
                  <span>
                    {this.getComponentElementContents('buttonText')?.content}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
