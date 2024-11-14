import { ApiEndPoints } from '@constants/apiEndPoints';
import { PathUtil } from '@utils/path.util';
import { ApiRequest } from '@library/api/request';
import {
  ISitemapGetMapsResultService,
  ISitemapGetPostParamService,
  ISitemapGetPostResultService,
  ISitemapGetPostTermParamService,
  ISitemapGetPostTermResultService,
} from 'types/services/sitemap.service';

const getMaps = () => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SITEMAP_WITH.GET_MAPS,
  }).get<ISitemapGetMapsResultService>();
};

const getPost = (params: ISitemapGetPostParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SITEMAP_WITH.GET_POST,
    data: params,
  }).get<ISitemapGetPostResultService[]>();
};

const getPostTerm = (params: ISitemapGetPostTermParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SITEMAP_WITH.GET_POST_TERM,
    data: params,
  }).get<ISitemapGetPostTermResultService[]>();
};

export const SitemapService = {
  getMaps: getMaps,
  getPost: getPost,
  getPostTerm: getPostTerm,
};
