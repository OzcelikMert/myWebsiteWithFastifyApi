import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';
import { PageTypeId } from '@constants/pageTypes';
import { ImageSourceUtil } from '@utils/imageSource.util';

type IPageState = {};

type IPageProps = {
  component: IComponentGetResultService;
  title?: string;
  content?: string;
  buttons?: JSX.Element;
  backgroundImage?: string;
} & IPagePropCommon;

class ComponentThemeHeader extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
  }

  HomePageContent = () => {
    return (
      <div className="content">
        <h2 className="animate__animated animate__fadeInDown animate__fast">
          {this.props.appData.settings.seoContents?.title}
        </h2>
        <p className="animate__animated animate__fadeInDown animate__delay-1s">
          {this.getComponentElementContents('content')?.content}
        </p>
        <div className="buttons mt-3 animate__animated animate__fadeInDown animate__delay-2s">
          <a href="#hero-section" className="btn btn-primary btn-lg">
            <span>
              {this.getComponentElementContents('buttonText')?.content}
            </span>
          </a>
        </div>
      </div>
    );
  };

  PageContent = () => {
    return (
      <div className="content">
        <h2 className="animate__animated animate__fadeInDown animate__fast">
          {this.props.title || this.props.pageData.page?.contents?.title}
        </h2>
        {this.props.content ? (
          <p className="animate__animated animate__fadeInDown animate__delay-1s">
            {this.props.content}
          </p>
        ) : null}
        {this.props.buttons ? (
          <div className="buttons mt-3 animate__animated animate__fadeInDown animate__delay-2s">
            {this.props.buttons}
          </div>
        ) : null}
      </div>
    );
  };

  BackgroundVideo = () => {
    return (
      <div className="video-wrap">
        <video
          className="video-bg"
          autoPlay
          playsInline
          loop
          muted
          preload="none"
          title="Water"
        >
          <source
            src={this.getComponentElementContents('videoURL')?.content}
            type="video/mp4"
          />
          <source
            src={this.getComponentElementContents('videoURL')?.content}
            type="video/mp4"
          />
        </video>
      </div>
    );
  };

  BackgroundImage = () => {
    const bgImage =
      this.props.backgroundImage ?? this.props.pageData.page?.contents?.image;
    return (
      <div
        className="image-bg"
        style={{
          backgroundImage: `url(${ImageSourceUtil.getUploadedImageSrc(bgImage)})`,
        }}
      ></div>
    );
  };

  render() {
    const isHomePage = this.props.pageData.page?.pageTypeId == PageTypeId.Home;
    return (
      <section
        className={`header-section container-fluid ${isHomePage ? 'home' : ''}`}
        id="header"
      >
        {this.props.backgroundImage ||
        this.props.pageData.page?.contents?.image ? (
          <this.BackgroundImage />
        ) : (
          <this.BackgroundVideo />
        )}
        <div className="mask"></div>
        {isHomePage ? <this.HomePageContent /> : <this.PageContent />}
      </section>
    );
  }
}

export default ComponentThemeHeader;
