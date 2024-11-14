import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { IPostTermGetResultService } from 'types/services/postTerm.service';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { PostTypeId } from '@constants/postTypes';
import { StatusId } from '@constants/status';
import { PostTermService } from '@services/postTerm.service';
import { PostTermTypeId } from '@constants/postTermTypes';
import ComponentCategory from '@components/elements/category';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageState = {
  selectedCategoryId: string;
};

type IPageProps = {
  component: IComponentGetResultService<{
    categories?: IPostTermGetResultService[];
  }>;
} & IPagePropCommon;

class ComponentThemeCategories extends ComponentHelperClass<
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
      <section className="categories-section">
        <div className="container">
          <h2 className="section-header animate__animated animate__fadeInDown animate__fast">
            {this.getComponentElementContents('title')?.content}
          </h2>
          <p className="section-content animate__animated animate__fadeInDown animate__delay-1s">
            {this.getComponentElementContents('describe')?.content}
          </p>
          <div className="categories-container">
            <div className="options">
              {this.props.component.customData?.categories?.map(
                (category, index) => (
                  <ComponentCategory
                    {...this.props}
                    item={category}
                    index={index}
                    onMouseOver={(item) => this.onMouseOver(item)}
                    isSelected={category._id == this.state.selectedCategoryId}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ComponentThemeCategories.initComponentServerSideProps = async (
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
    })
  ).data;
};

export default ComponentThemeCategories;
