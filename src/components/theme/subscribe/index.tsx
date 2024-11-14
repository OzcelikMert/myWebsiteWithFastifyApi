import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';
import Image from 'next/image';
import { ImageSourceUtil } from '@utils/imageSource.util';
import ComponentLoadingButton from '@components/elements/button/loadingButton';
import { HandleFormLibrary } from '@library/react/handles/form';
import { SubscriberService } from '@services/subscriber.service';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { VariableLibrary } from '@library/variable';

type IPageState = {
  isSubscribed: boolean;
  email: string;
};

type IPageProps = {
  component: IComponentGetResultService;
} & IPagePropCommon;

class ComponentThemeSubscribe extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      isSubscribed: false,
      email: '',
    };
  }

  async onClickSubscribe() {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (
      VariableLibrary.isEmpty(this.state.email) ||
      !this.state.email.match(isValidEmail)
    ) {
      return null;
    }

    const serviceResult = await SubscriberService.add({
      email: this.state.email,
    });
    this.setState({
      isSubscribed: true,
    });
  }

  SubscribeSuccessMessage = () => {
    return (
      <div className="subscribe-success mt-3">
        <h5 className="animate__animated animate__fadeInUp">
          {this.getComponentElementContents(
            'subscribeSuccessMessage'
          )?.content?.replace('{{subscriberEmail}}', this.state.email)}
        </h5>
      </div>
    );
  };

  Subscribe = () => {
    return (
      <AnimationOnScroll
        animateIn="animate__fadeInUp"
        delay={400}
        animateOnce={true}
        animatePreScroll={false}
      >
        <div className="subscribe row mt-3 text-center justify-content-center">
          <div className="col-md-10">
            <input
              type="email"
              className="form-control"
              placeholder="email@email.com"
              value={this.state.email}
              name="email"
              onChange={(event) => HandleFormLibrary.onChangeInput(event, this)}
            />
            <div className="form-text text-light">
              {
                this.getComponentElementContents('weWillNeverShareYourEmail')
                  ?.content
              }
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <ComponentLoadingButton
              text={this.getComponentElementContents('buttonText')?.content}
              className="btn btn-warning"
              onClick={() => this.onClickSubscribe()}
            />
          </div>
        </div>
      </AnimationOnScroll>
    );
  };

  render() {
    return (
      <section className="subscribe-section">
        <div className="container">
          <div
            className="content"
            style={{
              backgroundImage: `url(${ImageSourceUtil.getUploadedImageSrc(this.getComponentElementContents('bgImage')?.content)})`,
            }}
          >
            <div className="subscribe-mask"></div>
            <div className="card main-card">
              <div className="card-body">
                <div className="row d-flex">
                  <div className="col-md-5 order-lg-2">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center ps-1">
                        <div className="row justify-content-end">
                          <AnimationOnScroll
                            animateIn="animate__fadeInTopLeft"
                            animateOnce={true}
                            className="col-12 mb-3"
                            animatePreScroll={false}
                          >
                            <Image
                              className="img-fluid"
                              src={ImageSourceUtil.getUploadedImageSrc(
                                this.getComponentElementContents('image1')
                                  ?.content
                              )}
                              alt={
                                this.getComponentElementContents('title')
                                  ?.content ?? ''
                              }
                              width={250}
                              height={250}
                            />
                          </AnimationOnScroll>
                          <AnimationOnScroll
                            animateIn="animate__fadeInBottomLeft"
                            animateOnce={true}
                            delay={200}
                            className="col-11 mb-3"
                            animatePreScroll={false}
                          >
                            <Image
                              className="img-fluid"
                              src={ImageSourceUtil.getUploadedImageSrc(
                                this.getComponentElementContents('image2')
                                  ?.content
                              )}
                              alt={
                                this.getComponentElementContents('title')
                                  ?.content ?? ''
                              }
                              width={250}
                              height={250}
                            />
                          </AnimationOnScroll>
                        </div>
                      </div>
                      <div className="col-6 d-flex align-items-center ps-1">
                        <div className="row">
                          <AnimationOnScroll
                            animateIn="animate__fadeInTopRight"
                            animateOnce={true}
                            delay={100}
                            className="col-10 mb-3"
                            animatePreScroll={false}
                          >
                            <Image
                              className="img-fluid"
                              src={ImageSourceUtil.getUploadedImageSrc(
                                this.getComponentElementContents('image3')
                                  ?.content
                              )}
                              alt={
                                this.getComponentElementContents('title')
                                  ?.content ?? ''
                              }
                              width={250}
                              height={250}
                            />
                          </AnimationOnScroll>
                          <AnimationOnScroll
                            animateIn="animate__fadeInBottomRight"
                            delay={300}
                            animateOnce={true}
                            className="col-11 mb-3"
                            animatePreScroll={false}
                          >
                            <Image
                              className="img-fluid"
                              src={ImageSourceUtil.getUploadedImageSrc(
                                this.getComponentElementContents('image4')
                                  ?.content
                              )}
                              alt={
                                this.getComponentElementContents('title')
                                  ?.content ?? ''
                              }
                              width={250}
                              height={250}
                            />
                          </AnimationOnScroll>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 mt-4 mt-md-0 d-flex flex-column align-items-center align-items-md-start justify-content-center pe-md-5 mb-3 mb-md-0 text-center text-md-start">
                    <AnimationOnScroll
                      animateIn="animate__fadeInDown"
                      animateOnce={true}
                      animatePreScroll={false}
                    >
                      <h1 className="card-title text-light">
                        {this.getComponentElementContents('title')?.content}
                      </h1>
                    </AnimationOnScroll>
                    <AnimationOnScroll
                      animateIn="animate__fadeInDown"
                      delay={200}
                      animateOnce={true}
                      animatePreScroll={false}
                    >
                      <p className="card-text text-light pe-md-5">
                        {this.getComponentElementContents('describe')?.content}
                      </p>
                    </AnimationOnScroll>
                    {this.state.isSubscribed ? (
                      <this.SubscribeSuccessMessage />
                    ) : (
                      <this.Subscribe />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ComponentThemeSubscribe;
