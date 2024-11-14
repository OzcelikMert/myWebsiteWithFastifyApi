import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  IPostGetCountParamService,
  IPostGetManyParamService,
  IPostGetManyResultService,
  IPostGetOneResultService,
  IPostGetPrevNextParamService,
  IPostGetPrevNextResultService,
  IPostGetWithURLParamService,
  IPostUpdateViewWithIdParamService,
} from 'types/services/post.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';

const getWithURL = (params: IPostGetWithURLParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET_WITH_URL(params.url),
    data: params,
  }).get<IPostGetOneResultService>();
};

const getMany = (params: IPostGetManyParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET,
    data: params,
  }).get<IPostGetManyResultService[]>();
};

const getPrevNextWithId = (params: IPostGetPrevNextParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET_PREV_NEXT_WITH_ID(params._id),
    data: params,
  }).get<{
    prev?: IPostGetPrevNextResultService;
    next?: IPostGetPrevNextResultService;
  }>();
};

const getCount = (params: IPostGetCountParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.GET_COUNT,
    data: params,
  }).get<number>();
};

const updateViewWithId = (params: IPostUpdateViewWithIdParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.POST_WITH.UPDATE_VIEW_WITH_ID(params._id),
    data: params,
  }).put();
};

export const PostService = {
  getWithURL: getWithURL,
  getPrevNextWithId: getPrevNextWithId,
  getMany: getMany,
  getCount: getCount,
  updateViewWithId: updateViewWithId,
};
