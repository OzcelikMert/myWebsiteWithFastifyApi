import { BlogsEndPoint } from '@constants/endPoints/blogs.endPoint';

export class EndPoints {
  static get HOME() {
    return '/';
  }

  static PAGE(url?: string) {
    return `/${url ?? '[url]'}`;
  }

  static BLOG(url?: string) {
    return `/blog/${url ?? '[url]'}`;
  }
  static get BLOGS() {
    return '/blogs';
  }
  static get BLOGS_WITH() {
    return new BlogsEndPoint();
  }
}
