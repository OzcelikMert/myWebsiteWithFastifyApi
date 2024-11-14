import React from 'react';
import { IPagePropCommon } from 'types/pageProps';
import { ComponentHelperClass } from '@classes/componentHelper.class';
import { StatusId } from '@constants/status';
import { UserService } from '@services/user.service';
import { PermissionId } from '@constants/permissions';
import { IUserGetResultService } from 'types/services/user.service';
import Image from 'next/image';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageState = {};

type IPageProps = {
  component: IComponentGetResultService<{ authors?: IUserGetResultService[] }>;
} & IPagePropCommon;

class ComponentThemeAuthors extends ComponentHelperClass<
  IPageProps,
  IPageState
> {
  constructor(props: IPageProps) {
    super(props);
    this.state = {};
  }

  Author = (item: IUserGetResultService, index: number) => {
    return (
      <div key={item._id} className="card-wrapper">
        <div className="card">
          <div className="card-image">
            <Image
              className="img-fluid"
              src={ImageSourceUtil.getUploadedImageSrc(item.image)}
              alt={item.name}
              fill
            />
          </div>
          <ul className="social-icons">
            <li>
              <a href={item.facebook ?? '#'}>
                <i className="mdi mdi-facebook"></i>
              </a>
            </li>
            <li>
              <a href={item.instagram ?? '#'}>
                <i className="mdi mdi-instagram"></i>
              </a>
            </li>
            <li>
              <a href={item.twitter ?? '#'}>
                <i className="mdi mdi-twitter"></i>
              </a>
            </li>
            <li>
              <a href={item.email ? `mailto:${item.email}` : '#'}>
                <i className="mdi mdi-email"></i>
              </a>
            </li>
          </ul>

          <div className="details">
            <h2>
              {item.name}
              <br />
              <span className="job-title">{item.comment}</span>
            </h2>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <section className="authors-section">
        <div className="container">
          <h2 className="section-header animate__animated animate__fadeInDown animate__fast">
            {this.getComponentElementContents('title')?.content}
          </h2>
          <p className="section-content animate__animated animate__fadeInDown animate__delay-1s">
            {this.getComponentElementContents('describe')?.content}
          </p>
          <div className="container d-flex flex-wrap justify-content-center">
            {this.props.component.customData?.authors?.map((author, index) =>
              this.Author(author, index)
            )}
          </div>
        </div>
      </section>
    );
  }
}

ComponentThemeAuthors.initComponentServerSideProps = async (req, component) => {
  component.customData = {};
  component.customData.authors = (
    await UserService.getMany({
      statusId: StatusId.Active,
      permissions: [PermissionId.BlogAdd, PermissionId.BlogEdit],
    })
  ).data;
};

export default ComponentThemeAuthors;
