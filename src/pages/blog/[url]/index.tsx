import React, { Component } from 'react';
import { GetServerSidePropsContext } from 'next';
import { IPagePropCommon } from 'types/pageProps';
import { PageSSRUtil } from '@utils/page.ssr.util';
import { PostService } from '@services/post.service';
import { PostTypeId } from '@constants/postTypes';
import { StatusId } from '@constants/status';
import {
  IPostGetManyResultService,
  IPostGetOneResultService,
  IPostGetPrevNextResultService,
} from 'types/services/post.service';
import HTMLReactParser from 'html-react-parser';
import ComponentAppLayout from '@components/app/layout';
import { IPostTermPopulateService } from 'types/services/postTerm.service';
import { UrlUtil } from '@utils/url.util';
import { EndPoints } from '@constants/endPoints';
import { IUserPopulateService } from 'types/services/user.service';
import Image from 'next/image';
import { ImageSourceUtil } from '@utils/imageSource.util';
import { DateMask } from '@library/variable/date';
import ComponentBlog from '@components/elements/blog';

type PageState = {};

type PageProps = {} & IPagePropCommon<{
  blog?: IPostGetOneResultService;
  prevBlog?: IPostGetPrevNextResultService;
  nextBlog?: IPostGetPrevNextResultService;
  blogsMightLike?: IPostGetManyResultService[];
  url?: string;
}>;

export default class PageBlogURL extends Component<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);
  }

  Author = (props: IUserPopulateService, index: number) => {
    const blog = this.props.pageData.blog;
    const date = new Date(blog?.createdAt ?? '');
    const authorURL = UrlUtil.createHref({
      url: this.props.getURL,
      targetPath: EndPoints.BLOGS_WITH.AUTHOR(props.url),
    });
    return (
      <div className="author mt-2">
        <div className="row">
          <div className="col-8 d-flex flex-row align-items-center">
            <div className="avatar d-inline-block me-3">
              <a href={authorURL} className="hover-top">
                <Image
                  src={ImageSourceUtil.getUploadedImageSrc(props.image)}
                  alt={props.name}
                  className="img-fluid"
                  width={40}
                  height={40}
                />
              </a>
            </div>
            <div className="d-inline-block">
              <div className="author">
                {this.props.t('by')}{' '}
                <a href={authorURL}>
                  <span>{props.name}</span>
                </a>
              </div>
              <div className="date">
                <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                  <span>{date.toDateString()}</span>
                </time>
              </div>
            </div>
          </div>
          <div className="col-4 text-end fs-4">
            <a className="me-2" href={props.facebook || '#'}>
              <span>
                <i className="mdi mdi-facebook"></i>
              </span>
            </a>
            <a className="me-2" href={props.instagram || '#'}>
              <span>
                <i className="mdi mdi-instagram"></i>
              </span>
            </a>
            <a href={props.twitter || '#'}>
              <span>
                <i className="mdi mdi-twitter"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  Category = (props: IPostTermPopulateService, index: number) => {
    const categoryURL = UrlUtil.createHref({
      url: this.props.getURL,
      targetPath: EndPoints.BLOGS_WITH.CATEGORY(props.contents.url),
    });
    return (
      <a href={categoryURL} className="btn btn-light">
        {' '}
        <span>{props.contents.title}</span>
      </a>
    );
  };

  PrevBlog = () => {
    const blog = this.props.pageData.prevBlog!;
    const blogURL = UrlUtil.createHref({
      url: this.props.getURL,
      targetPath: EndPoints.BLOG(blog?.contents?.url),
    });
    const date = new Date(blog?.createdAt ?? '');
    return (
      <article className="prev-blog" title={blog?.contents?.title}>
        <div className="card">
          <div className="card-body d-flex flex-row">
            <div className="image hover-top">
              <a href={blogURL} className="img-link">
                <Image
                  src={ImageSourceUtil.getUploadedImageSrc(
                    blog?.contents?.image
                  )}
                  alt={blog?.contents?.title ?? ''}
                  className="img-fluid rounded-4"
                  width={150}
                  height={150}
                />
              </a>
            </div>
            <div className="ms-3 align-content-center">
              <a href={blogURL} className="fw-bold fs-4">
                <span>{blog?.contents?.title}</span>
              </a>
              <div className="date">
                <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                  <span>{date.toDateString()}</span>
                </time>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  NextBlog = () => {
    const blog = this.props.pageData.nextBlog!;
    const blogURL = UrlUtil.createHref({
      url: this.props.getURL,
      targetPath: EndPoints.BLOG(blog?.contents?.url),
    });
    const date = new Date(blog?.createdAt ?? '');
    return (
      <article className="next-blog" title={blog?.contents?.title}>
        <div className="card">
          <div className="card-body d-flex flex-row justify-content-end">
            <div className="align-content-center me-3">
              <a href={blogURL} className="fw-bold fs-4">
                <span>{blog?.contents?.title}</span>
              </a>
              <div className="date">
                <time dateTime={date.getStringWithMask(DateMask.DATE)}>
                  <span>{date.toDateString()}</span>
                </time>
              </div>
            </div>
            <div className="image hover-top">
              <a href={blogURL} className="img-link">
                <Image
                  src={ImageSourceUtil.getUploadedImageSrc(
                    blog?.contents?.image
                  )}
                  alt={blog?.contents?.title ?? ''}
                  className="img-fluid rounded-4"
                  width={150}
                  height={150}
                />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  };

  render() {
    const blog = this.props.pageData.blog;
    return (
      <ComponentAppLayout
        {...this.props}
        pageTitle={`${this.props.t('blog')} - ${blog?.contents?.title || this.props.pageData.url}`}
        headerBgImage={blog?.contents?.image}
        headerContent={blog?.contents?.shortContent}
      >
        <div className="page page-blog">
          <section className="blog-section">
            <div className="container">
              <article title={blog?.contents?.title}>
                <div className="content">
                  {this.props.pageData.blog?.contents?.content
                    ? HTMLReactParser(blog?.contents?.content || '')
                    : null}
                </div>
                <div className="content-bottom mt-5">
                  <div className="categories pb-3 border-bottom">
                    <h6 className="fw-bold">{this.props.t('categories')}</h6>
                    <div className="blog-category-badges">
                      {this.props.pageData.blog?.categories?.map(
                        (category, index) => this.Category(category, index)
                      )}
                    </div>
                  </div>
                  <div className="authors mt-3">
                    <h6 className="fw-bold">{this.props.t('authors')}</h6>
                    {blog
                      ? [blog.authorId, ...(blog.authors ?? [])].map(
                          (author, index) => this.Author(author, index)
                        )
                      : null}
                  </div>
                </div>
              </article>
              <div className="prev-next mt-5 blogs">
                <div className="title border-bottom">
                  <h6 className="d-inline-block w-50">
                    {this.props.t('previous')}
                  </h6>
                  <h6 className="d-inline-block w-50 text-end">
                    {this.props.t('next')}
                  </h6>
                </div>
                <div className="row">
                  <div className="col-md-6 text-start">
                    {this.props.pageData.prevBlog ? <this.PrevBlog /> : null}
                  </div>
                  <div className="col-md-6 text-end">
                    {this.props.pageData.nextBlog ? <this.NextBlog /> : null}
                  </div>
                </div>
              </div>
              <div className="blogs mt-5">
                <div className="title border-bottom">
                  <h6>{this.props.t('blogsYouMightLike')}</h6>
                </div>
                <div className="row">
                  {this.props.pageData.blogsMightLike?.map((item, index) => (
                    <ComponentBlog
                      {...this.props}
                      className={`col-md-4 mt-4`}
                      item={item}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </ComponentAppLayout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const req = context.req;
  const res = context.res;

  const url = (context.params?.url as string) || '';
  req.pageData.url = decodeURI(url);

  const serviceResultBlog = await PostService.getWithURL({
    typeId: PostTypeId.Blog,
    url: url,
    langId: req.appData.selectedLangId,
    statusId: StatusId.Active,
  });

  if (serviceResultBlog.status && serviceResultBlog.data) {
    req.pageData.page = {} as any;
    req.pageData.blog = serviceResultBlog.data;

    if (serviceResultBlog.data.tags && serviceResultBlog.data.tags.length > 0) {
      req.pageData.page!.tags = serviceResultBlog.data.tags;
    }

    const serviceResultBlogPrevNext = await PostService.getPrevNextWithId({
      _id: serviceResultBlog.data._id,
      typeId: serviceResultBlog.data.typeId,
      langId: req.appData.selectedLangId,
      statusId: StatusId.Active,
    });

    if (serviceResultBlogPrevNext.status && serviceResultBlogPrevNext.data) {
      req.pageData.prevBlog = serviceResultBlogPrevNext.data.prev;
      req.pageData.nextBlog = serviceResultBlogPrevNext.data.next;
    }

    const serviceResultBlogsMightLike = await PostService.getMany({
      typeId: [serviceResultBlog.data.typeId],
      categories: serviceResultBlog.data.categories?.map(
        (category) => category._id
      ),
      langId: req.appData.selectedLangId,
      statusId: StatusId.Active,
      count: 3,
      ignorePostId: [
        serviceResultBlog.data._id,
        ...(serviceResultBlogPrevNext.data?.next
          ? [serviceResultBlogPrevNext.data.next._id]
          : []),
        ...(serviceResultBlogPrevNext.data?.prev
          ? [serviceResultBlogPrevNext.data.prev._id]
          : []),
      ],
    });

    if (
      serviceResultBlogsMightLike.status &&
      serviceResultBlogsMightLike.data
    ) {
      req.pageData.blogsMightLike = serviceResultBlogsMightLike.data;
    }

    await PostService.updateViewWithId({
      _id: serviceResultBlog.data._id,
      typeId: serviceResultBlog.data.typeId,
      langId: req.appData.selectedLangId,
      url: url,
    });
  }

  return {
    props: PageSSRUtil.getProps(req),
  };
}
