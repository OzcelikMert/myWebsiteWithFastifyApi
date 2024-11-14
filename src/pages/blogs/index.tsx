import React, { Component } from 'react';
import { GetServerSidePropsContext } from 'next';
import { PageSSRUtil } from '@utils/page.ssr.util';
import { IPagePropCommon } from 'types/pageProps';
import { PageTypeId } from '@constants/pageTypes';
import ComponentAppLayout from '@components/app/layout';
import { PostTermService } from '@services/postTerm.service';
import { PostTermTypeId } from '@constants/postTermTypes';
import { PostTypeId } from '@constants/postTypes';
import { StatusId } from '@constants/status';
import { IPostTermGetResultService } from 'types/services/postTerm.service';
import { PostService } from '@services/post.service';
import { IPostGetManyResultService } from 'types/services/post.service';
import ComponentBlog from '@components/elements/blog';
import ComponentLoadingButton from '@components/elements/button/loadingButton';
import { UserService } from '@services/user.service';
import { IUserGetResultService } from 'types/services/user.service';
import { EndPoints } from '@constants/endPoints';

type PageState = {
  blogs: IPostGetManyResultService[];
  isActiveShowMoreButton: boolean;
};

type PageProps = {} & IPagePropCommon<{
  blogs?: IPostGetManyResultService[];
  maxBlogCount?: number;
  category?: IPostTermGetResultService;
  author?: IUserGetResultService;
  params: {
    search?: string;
    page: number;
  };
}>;

const perPageBlogCount = 9;

export default class PageBlogs extends Component<PageProps, PageState> {
  pageNumber = 1;

  constructor(props: PageProps) {
    super(props);
    this.state = {
      blogs: this.props.pageData.blogs ?? [],
      isActiveShowMoreButton:
        (this.props.pageData.maxBlogCount || 0) >
        (this.props.pageData.blogs?.length || 0),
    };
  }

  getPageTitle() {
    let title: string = this.props.pageData.category
      ? this.props.pageData.category.contents!.title!
      : this.props.pageData.author?.name
        ? this.props.pageData.author.name
        : (this.props.pageData.params.search ?? '');

    if (this.props.pageData.params.page > 1) {
      title = `${title.length > 0 ? '- ' : ''}${this.props.pageData.params.page}`;
    }

    return `${this.props.pageData.page?.contents?.title} ${title.length > 0 ? `- ${title}` : ''}`;
  }

  async onClickShowMore() {
    if (!this.state.isActiveShowMoreButton) return false;
    this.pageNumber += 1;
    const serviceResult = await PostService.getMany({
      langId: this.props.appData.selectedLangId,
      typeId: [PostTypeId.Blog],
      statusId: StatusId.Active,
      count: perPageBlogCount,
      page: this.pageNumber,
      ...(this.props.pageData.category
        ? { categories: [this.props.pageData.category._id] }
        : {}),
      ...(this.props.pageData.params.search
        ? { title: this.props.pageData.params.search }
        : {}),
    });
    if (serviceResult.status && serviceResult.data) {
      this.setState(
        {
          blogs: [...this.state.blogs, ...serviceResult.data],
        },
        () => {
          this.setState({
            isActiveShowMoreButton:
              (this.props.pageData.maxBlogCount || 0) > this.state.blogs.length,
          });
        }
      );
    }
  }

  AuthorSocialMedia = () => {
    const author = this.props.pageData.author;
    return (
      <div>
        <a className="me-4 fs-3 text-light" href={author?.facebook || '#'}>
          <span>
            <i className="mdi mdi-facebook"></i>
          </span>
        </a>
        <a className="me-4 fs-3 text-light" href={author?.instagram || '#'}>
          <span>
            <i className="mdi mdi-instagram"></i>
          </span>
        </a>
        <a className="fs-3 text-light" href={author?.twitter || '#'}>
          <span>
            <i className="mdi mdi-twitter"></i>
          </span>
        </a>
      </div>
    );
  };

  render() {
    return (
      <ComponentAppLayout
        {...this.props}
        pageTitle={this.getPageTitle()}
        headerBgImage={
          this.props.pageData.category?.contents?.image ||
          this.props.pageData.author?.image
        }
        headerContent={
          this.props.pageData.category?.contents?.shortContent ||
          this.props.pageData.author?.comment
        }
        headerButtons={
          this.props.pageData.author ? <this.AuthorSocialMedia /> : undefined
        }
      >
        <div className="page page-blogs">
          <section className="page-blogs">
            <div className="container">
              <div className="blogs">
                <h5 className="animate__animated animate__fadeInLeft animate__fast">
                  {this.props
                    .t('blogFoundMessage')
                    .replace(
                      '{{blogsCount}}',
                      this.props.pageData.maxBlogCount?.toString() || '0'
                    )}
                </h5>
                <div className="row">
                  {this.state.blogs.map((item, index) => (
                    <ComponentBlog
                      {...this.props}
                      className={`col-md-4 mt-4`}
                      item={item}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div className="w-100 pt-5 text-center show-more">
                {this.state.isActiveShowMoreButton ? (
                  <ComponentLoadingButton
                    text={this.props.t('showMore')}
                    onClick={() => this.onClickShowMore()}
                  />
                ) : null}
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
  req.pageData.params = {};

  const page = Number(context.params?.page ?? 1) || 1;
  const search = decodeURI((context.params?.search as string) || '');
  const categoryURL = (context.params?.category as string) || null;
  const authorURL = (context.params?.author as string) || null;
  req.pageData.params.search = search;
  req.pageData.params.page = page;
  req.pageData.params.categoryURL = categoryURL;

  let categoryId = '';
  if (categoryURL) {
    const serviceResultCategory = await PostTermService.getWithURL({
      typeId: PostTermTypeId.Category,
      postTypeId: PostTypeId.Blog,
      langId: req.appData.selectedLangId,
      statusId: StatusId.Active,
      url: categoryURL,
    });

    if (serviceResultCategory.status && serviceResultCategory.data) {
      req.pageData.category = serviceResultCategory.data;
      categoryId = serviceResultCategory.data._id;

      await PostTermService.updateViewWithId({
        _id: serviceResultCategory.data._id,
        typeId: serviceResultCategory.data.typeId,
        postTypeId: serviceResultCategory.data.postTypeId,
        langId: req.appData.selectedLangId,
        url: EndPoints.BLOGS_WITH.CATEGORY(categoryURL),
      });
    }
  }

  let authorId = '';
  if (authorURL) {
    const serviceResultAuthor = await UserService.getWithURL({
      statusId: StatusId.Active,
      url: authorURL,
    });

    if (serviceResultAuthor.status && serviceResultAuthor.data) {
      req.pageData.author = serviceResultAuthor.data;
      authorId = serviceResultAuthor.data._id;
    }
  }

  await PageSSRUtil.init({
    req: req,
    url: 'blogs',
    typeId: PageTypeId.Blogs,
    increaseView: true,
  });

  if (req.pageData.page && req.pageData.page.pageTypeId == PageTypeId.Blogs) {
    req.pageData.blogs = (
      await PostService.getMany({
        langId: req.appData.selectedLangId,
        typeId: [PostTypeId.Blog],
        statusId: StatusId.Active,
        count: perPageBlogCount,
        page: page,
        ...(search ? { title: search } : {}),
        ...(categoryId ? { categories: [categoryId] } : {}),
        ...(authorId ? { authorId: authorId } : {}),
      })
    ).data;

    req.pageData.maxBlogCount = (
      await PostService.getCount({
        typeId: PostTypeId.Blog,
        statusId: StatusId.Active,
        ...(search ? { title: search } : {}),
        ...(categoryId ? { categories: [categoryId] } : {}),
        ...(authorId ? { authorId: authorId } : {}),
      })
    ).data;
  }

  return {
    props: PageSSRUtil.getProps(req),
  };
}
