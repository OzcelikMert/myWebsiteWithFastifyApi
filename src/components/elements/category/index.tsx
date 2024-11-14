import React, { Component } from 'react';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { IPostTermGetResultService } from 'types/services/postTerm.service';
import { IPagePropCommon } from 'types/pageProps';
import { UrlUtil } from '@utils/url.util';
import { EndPoints } from '@constants/endPoints';

type IPageState = {};

type IPageProps = {
  item: IPostTermGetResultService;
  index?: number;
  isSelected?: boolean;
  onMouseOver?: (item: IPostTermGetResultService) => void;
} & IPagePropCommon;

export default class ComponentCategory extends Component<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
  }

  onMouseOver() {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(this.props.item);
    }
  }

  render() {
    const categoryURL = UrlUtil.createHref({
      url: this.props.getURL,
      targetPath: EndPoints.BLOGS_WITH.CATEGORY(this.props.item.contents?.url),
    });
    return (
      <div
        key={this.props.item._id}
        className={`option ${this.props.isSelected ? 'active' : ''}`}
        onMouseOver={(event) => this.onMouseOver()}
      >
        <a href={categoryURL}>
          <div
            className="bg-img"
            style={{
              backgroundImage: `url(${ImageSourceUtil.getUploadedImageSrc(this.props.item.contents?.image)})`,
            }}
          ></div>
          <div className="label-shadow"></div>
          <div className="label">
            <div className="icon">
              <i className="mdi mdi-walk"></i>
            </div>
            <div className="info">
              <h2 className="main">{this.props.item.contents?.title}</h2>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
