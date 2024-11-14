import { EndPoints } from '@constants/endPoints/index';
import { PathUtil } from '@utils/path.util';

export class BlogsEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.BLOGS) {
    this.mainPath = mainPath;
  }

  CATEGORY(categoryURL?: string) {
    return PathUtil.createPath(
      this.mainPath,
      `/category/${categoryURL ?? '[category]'}`
    );
  }
  CATEGORY_WITH(categoryURL?: string) {
    return new BlogsEndPoint(this.CATEGORY(categoryURL));
  }

  AUTHOR(authorURL?: string) {
    return PathUtil.createPath(
      this.mainPath,
      `/author/${authorURL ?? '[author]'}`
    );
  }
  AUTHOR_WITH(authorURL?: string) {
    return new BlogsEndPoint(this.AUTHOR(authorURL));
  }

  PAGE(page?: string) {
    return PathUtil.createPath(this.mainPath, `/page/${page ?? '[page]'}`);
  }
  PAGE_WITH(page?: string) {
    return new BlogsEndPoint(this.PAGE(page));
  }

  SEARCH(search?: string) {
    return PathUtil.createPath(
      this.mainPath,
      `/search/${search ?? '[search]'}`
    );
  }
  SEARCH_WITH(search?: string) {
    return new BlogsEndPoint(this.SEARCH(search));
  }
}
