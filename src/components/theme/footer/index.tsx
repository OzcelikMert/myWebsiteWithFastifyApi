import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { IComponentGetResultService } from 'types/services/component.service';
import { SocialMediaKey } from '@constants/socialMediaKeys';
import { NavigationService } from '@services/navigation.service';
import { StatusId } from '@constants/status';
import { PostService } from '@services/post.service';
import { PostTypeId } from '@constants/postTypes';
import { PostSortTypeId } from '@constants/postSortTypes';
import { INavigationGetResultService } from 'types/services/navigation.service';
import { IPostGetManyResultService } from 'types/services/post.service';
import { UrlUtil } from '@utils/url.util';
import Image from 'next/image';
import { ImageSourceUtil } from '@utils/imageSource.util';

type IPageState = {};

type IPageProps = {
  component: IComponentGetResultService<{
    navigations?: INavigationGetResultService[];
    hotBlogs?: IPostGetManyResultService[];
    hitBlogs?: IPostGetManyResultService[];
  }>;
} & IPagePropCommon;

class ComponentThemeFooter extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
  }

  Languages = () => {
    return (
      <div className="text-start mt-3">
        <small className="fw-bold">
          {this.getComponentElementContents('languagesTitle')?.content}:
        </small>
        <span>
          {this.props.appData.languages.map((language, index) => (
            <a
              href={
                language._id == this.props.appData.selectedLangId
                  ? '#'
                  : UrlUtil.replaceLanguageCode({
                      url: this.props.getURL,
                      newLanguage: language,
                    })
              }
              className={`ms-2 ${language._id == this.props.appData.selectedLangId ? 'text-muted' : ''}`}
            >
              <span>
                <Image
                  src={ImageSourceUtil.getFlagSrc(language.image)}
                  alt={language.title}
                  className="img-fluid"
                  height={10}
                  width={15}
                />
                <small className="ms-1">{language.title}</small>
              </span>
            </a>
          ))}
        </span>
      </div>
    );
  };

  Copyright = () => {
    return (
      <div className="text-center mt-3">
        <small>
          © {this.props.appData.settings.seoContents?.title}{' '}
          {new Date().getStringWithMask('yyyy')}. All rights reserved.
        </small>
      </div>
    );
  };

  Main = () => {
    return (
      <div className="row d-flex flex-wrap border-top pt-2 pt-md-5">
        <div className="col-12 col-lg-4 mt-3 mt-md-0">
          <h1 className="fw-bold">
            {this.props.appData.settings.seoContents?.title}
          </h1>
          <p>{this.getComponentElementContents('describe')?.content}</p>
        </div>
        <div className="col-6 col-lg-2 mt-3 mt-md-0">
          <h4>{this.getComponentElementContents('socialTitle')?.content}</h4>
          <ul>
            <li>
              <a href={this.getSocialMediaURL(SocialMediaKey.Twitter)}>
                <span>
                  <i className="mdi mdi-twitter"></i> Twitter
                </span>
              </a>
            </li>
            <li>
              <a href={this.getSocialMediaURL(SocialMediaKey.Instagram)}>
                <span>
                  <i className="mdi mdi-instagram"></i> Instagram
                </span>
              </a>
            </li>
            <li>
              <a href={this.getSocialMediaURL(SocialMediaKey.Facebook)}>
                <span>
                  <i className="mdi mdi-facebook"></i> Facebook
                </span>
              </a>
            </li>
            <li>
              <a href={this.getSocialMediaURL(SocialMediaKey.Youtube)}>
                <span>
                  <i className="mdi mdi-youtube"></i> Youtube
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-6 col-lg-2 mt-3 mt-md-0">
          <h4>{this.getComponentElementContents('pagesTitle')?.content}</h4>
          <ul>
            {this.props.component.customData?.navigations?.map((navigation) => (
              <li>
                <a href={navigation.contents?.url}>
                  <span>{navigation.contents?.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-6 col-lg-2 mt-3 mt-md-0">
          <h4>{this.getComponentElementContents('hotBlogsTitle')?.content}</h4>
          <ul>
            {this.props.component.customData?.hotBlogs?.map((blog) => (
              <li>
                <a href={blog.contents?.url}>
                  <span>{blog.contents?.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-6 col-lg-2 mt-3 mt-md-0">
          <h4>{this.getComponentElementContents('hitBlogsTitle')?.content}</h4>
          <ul>
            {this.props.component.customData?.hitBlogs?.map((blog) => (
              <li>
                <a href={blog.contents?.url}>
                  <span>{blog.contents?.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    return (
      <footer className="footer-section">
        <div className="container">
          <this.Main />
          <this.Languages />
          <this.Copyright />
        </div>
      </footer>
    );
  }
}

ComponentThemeFooter.initComponentServerSideProps = async (req, component) => {
  component.customData = {};

  component.customData.navigations =
    (
      await NavigationService.getMany({
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active,
        isSecondary: true,
      })
    ).data ?? [];

  component.customData.hotBlogs =
    (
      await PostService.getMany({
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active,
        typeId: [PostTypeId.Blog],
        sortTypeId: PostSortTypeId.Newest,
        count: 4,
      })
    ).data ?? [];

  component.customData.hitBlogs =
    (
      await PostService.getMany({
        langId: req.appData.selectedLangId,
        statusId: StatusId.Active,
        typeId: [PostTypeId.Blog],
        sortTypeId: PostSortTypeId.MostPopular,
        count: 4,
      })
    ).data ?? [];
};

export default ComponentThemeFooter;
