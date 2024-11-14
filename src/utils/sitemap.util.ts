import { PostTypeId } from '@constants/postTypes';
import { PageTypeId } from '@constants/pageTypes';
import { PathUtil } from '@utils/path.util';
import { PostUtil } from '@utils/post.util';

const getLoc = (...strings: string[]) => {
  return PathUtil.createPath.apply(getLoc, strings).slice(1);
};

const getSitemapPostLoc = (
  typeId: PostTypeId,
  url: string,
  pageTypeId?: PageTypeId
) => {
  const sitemapName =
    typeId == PostTypeId.Page ? '' : `${PostUtil.getTypeName(typeId)}/`;
  url = pageTypeId == PageTypeId.Home ? '' : url;
  return `${sitemapName}${url}`;
};

const getSitemapPostPriority = (
  typeId: PostTypeId,
  pageTypeId?: PageTypeId
) => {
  let priority = '0.5';

  if (typeId == PostTypeId.Page) {
    priority = '0.8';
  }

  if (pageTypeId == PageTypeId.Home) {
    priority = '1.0';
  }

  return priority;
};

export const SitemapUtil = {
  getLoc: getLoc,
  getSitemapPostLoc: getSitemapPostLoc,
  getSitemapPostPriority: getSitemapPostPriority,
};
