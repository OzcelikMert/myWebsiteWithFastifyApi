import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { SocialMediaKey } from '@constants/socialMediaKeys';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageState = {};

type IPageProps = {
  component: IComponentGetResultService;
} & IPagePropCommon;

export default class ComponentThemeFeatures extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
  }

  render() {
    return (
      <section className="property-section">
        <div className="container">
          <div className="row">
            <AnimationOnScroll
              animateIn="animate__fadeInLeft"
              animateOnce={true}
              className="col-lg-7 text-center cards"
              animatePreScroll={false}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <span>
                          <i
                            style={{ color: 'blue' }}
                            className={`mdi mdi-${this.getComponentElementContents('feature1Icon')?.content}`}
                          ></i>
                        </span>
                      </div>
                      <h4 className="card-title">
                        {
                          this.getComponentElementContents('feature1Title')
                            ?.content
                        }
                      </h4>
                      <p className="card-text">
                        {
                          this.getComponentElementContents('feature1Describe')
                            ?.content
                        }{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <span>
                          <i
                            style={{ color: 'red' }}
                            className={`mdi mdi-${this.getComponentElementContents('feature2Icon')?.content}`}
                          ></i>
                        </span>
                      </div>
                      <h4 className="card-title">
                        {
                          this.getComponentElementContents('feature2Title')
                            ?.content
                        }
                      </h4>
                      <p className="card-text">
                        {
                          this.getComponentElementContents('feature2Describe')
                            ?.content
                        }{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <span>
                          <i
                            style={{ color: 'orange' }}
                            className={`mdi mdi-${this.getComponentElementContents('feature3Icon')?.content}`}
                          ></i>
                        </span>
                      </div>
                      <h4 className="card-title">
                        {
                          this.getComponentElementContents('feature3Title')
                            ?.content
                        }
                      </h4>
                      <p className="card-text">
                        {
                          this.getComponentElementContents('feature3Describe')
                            ?.content
                        }{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <span>
                          <i
                            style={{ color: 'green' }}
                            className={`mdi mdi-${this.getComponentElementContents('feature4Icon')?.content}`}
                          ></i>
                        </span>
                      </div>
                      <h4 className="card-title">
                        {
                          this.getComponentElementContents('feature4Title')
                            ?.content
                        }
                      </h4>
                      <p className="card-text">
                        {
                          this.getComponentElementContents('feature4Describe')
                            ?.content
                        }{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationOnScroll>
            <AnimationOnScroll
              animateIn="animate__fadeInRight"
              animateOnce={true}
              className="col-lg-5 content ps-lg-5 mt-3 mt-lg-0 d-flex flex-column text-center"
              animatePreScroll={false}
            >
              <div className="align-items-start">
                <h1 className="fw-bold">
                  {this.getComponentElementContents('title')?.content}
                </h1>
                <p className="fs-6 opacity-75">
                  {this.getComponentElementContents('describe')?.content}
                </p>
                <a href="#" className="btn btn-primary btn-lg mt-3">
                  <span>
                    {this.getComponentElementContents('buttonText')?.content}
                  </span>
                </a>
              </div>
              <div className="icons mt-auto pt-3">
                <div className="icon-title">
                  <h5>
                    {this.getComponentElementContents('socialTitle')?.content}
                  </h5>
                </div>
                <a href={this.getSocialMediaURL(SocialMediaKey.Facebook)}>
                  <i className="mdi mdi-facebook p-2"></i>
                </a>
                <a href={this.getSocialMediaURL(SocialMediaKey.Twitter)}>
                  <i className="mdi mdi-twitter p-2"></i>
                </a>
                <a href={this.getSocialMediaURL(SocialMediaKey.Instagram)}>
                  <i className="mdi mdi-instagram p-2"></i>
                </a>
              </div>
            </AnimationOnScroll>
          </div>
        </div>
      </section>
    );
  }
}
