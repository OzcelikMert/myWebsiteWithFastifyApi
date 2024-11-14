import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IPostGetManyResultService } from 'types/services/post.service';
import ComponentBlog from '@components/elements/blog';
import { IncomingMessage } from 'http';
import { PostService } from '@services/post.service';
import { PostTypeId } from '@constants/postTypes';
import { StatusId } from '@constants/status';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageState = {
  hotBlogs: IPostGetManyResultService[];
};

type IPageProps = {
  component: IComponentGetResultService<{
    hotBlogs?: IPostGetManyResultService[];
  }>;
} & IPagePropCommon;

class ComponentThemeHotBlogs extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      hotBlogs: this.props.component.customData?.hotBlogs ?? [],
    };
  }

  HotBlog = () => {
    const item = this.state.hotBlogs[0];
    return (
      <section className="recent-blog-section">
        <div className="container">
          <AnimationOnScroll
            animateIn="animate__fadeInDown"
            animateOnce={true}
            animatePreScroll={false}
          >
            <h2 className="section-header">
              {this.getComponentElementContents('hotTitle')?.content}
            </h2>
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeInDown"
            delay={200}
            animateOnce={true}
            animatePreScroll={false}
          >
            <p className="section-content">
              {this.getComponentElementContents('hotDescribe')?.content}
            </p>
          </AnimationOnScroll>
          <div className="d-flex blogs">
            <div className="row">
              <AnimationOnScroll
                animateIn="animate__fadeInLeft"
                delay={200}
                animateOnce={true}
                className="col-md-12"
                animatePreScroll={false}
              >
                <ComponentBlog
                  {...this.props}
                  item={item}
                  index={0}
                  imageWidth={1000}
                  imageHeight={500}
                />
              </AnimationOnScroll>
            </div>
          </div>
        </div>
      </section>
    );
  };

  HotBlogs = () => {
    const items = this.state.hotBlogs.filter((value, index) => index != 0);
    return (
      <section className="featured-blogs-section">
        <div className="container">
          <AnimationOnScroll
            animateIn="animate__fadeInDown"
            animateOnce={true}
            animatePreScroll={false}
          >
            <h2 className="section-header">
              {this.getComponentElementContents('hotsTitle')?.content}
            </h2>
          </AnimationOnScroll>
          <div className="blogs">
            <div className="row">
              {items.map((item, index) => (
                <AnimationOnScroll
                  animateIn="animate__fadeInRight"
                  delay={(index + 1) * 100}
                  animateOnce={true}
                  className="col-md-12 mt-4"
                  animatePreScroll={false}
                >
                  <ComponentBlog
                    {...this.props}
                    item={item}
                    index={index}
                    hideAuthorImage={true}
                    hideShortContent={true}
                    hideCategories={true}
                  />
                </AnimationOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  render() {
    return this.state.hotBlogs.length < 2 ? null : (
      <section className="hot-blogs-section" id="hot-blogs">
        <div className="container">
          <div className="row d-flex">
            <div className="col-lg-8">
              <this.HotBlog />
            </div>
            <div className="col-lg-4 ps-lg-5">
              <this.HotBlogs />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ComponentThemeHotBlogs.initComponentServerSideProps = async (
  req: IncomingMessage,
  component
) => {
  component.customData = {};
  component.customData.hotBlogs = (
    await PostService.getMany({
      langId: req.appData.selectedLangId,
      typeId: [PostTypeId.Blog],
      statusId: StatusId.Active,
      count: 4,
    })
  ).data;
};

export default ComponentThemeHotBlogs;
