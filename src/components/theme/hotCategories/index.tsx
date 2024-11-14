import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { IPostTermGetResultService } from 'types/services/postTerm.service';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { PostTypeId } from '@constants/postTypes';
import { StatusId } from '@constants/status';
import { PostTermService } from '@services/postTerm.service';
import { PostTermTypeId } from '@constants/postTermTypes';
import ComponentCategory from '@components/elements/category';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageState = {
  selectedCategoryId: string;
};

type IPageProps = {
  component: IComponentGetResultService<{
    categories?: IPostTermGetResultService[];
  }>;
} & IPagePropCommon;

class ComponentThemeHotCategories extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {
      selectedCategoryId: '',
    };
  }

  onMouseOver = (item: IPostTermGetResultService) => {
    this.setState({
      selectedCategoryId: item._id,
    });
  };

  render() {
    return (
      <section className="categories-section hot-categories-section">
        <div className="container">
          <AnimationOnScroll
            animateIn="animate__fadeInDown"
            animateOnce={true}
            animatePreScroll={false}
          >
            <h2 className="section-header">
              {this.getComponentElementContents('title')?.content}
            </h2>
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeInDown"
            delay={200}
            animateOnce={true}
            animatePreScroll={false}
          >
            <p className="section-content">
              {this.getComponentElementContents('describe')?.content}
            </p>
          </AnimationOnScroll>
          <AnimationOnScroll
            animateIn="animate__fadeInLeft"
            delay={500}
            animateOnce={true}
            animatePreScroll={false}
          >
            <div className="categories-container">
              <div className="options">
                {this.props.component.customData?.categories?.map(
                  (category, index) => (
                    <ComponentCategory
                      {...this.props}
                      item={category}
                      index={index}
                      onMouseOver={(item) => this.onMouseOver(item)}
                      isSelected={
                        (this.state.selectedCategoryId == '' && index == 0) ||
                        category._id == this.state.selectedCategoryId
                      }
                    />
                  )
                )}
              </div>
            </div>
          </AnimationOnScroll>
        </div>
      </section>
    );
  }
}

ComponentThemeHotCategories.initComponentServerSideProps = async (
  req,
  component
) => {
  component.customData = {};
  component.customData.categories = (
    await PostTermService.getMany({
      langId: req.appData.selectedLangId,
      typeId: [PostTermTypeId.Category],
      postTypeId: PostTypeId.Blog,
      statusId: StatusId.Active,
      count: 5,
    })
  ).data;
};

export default ComponentThemeHotCategories;
