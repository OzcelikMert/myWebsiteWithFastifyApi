import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  IUserGetManyParamService,
  IUserGetResultService,
  IUserGetWithURLParamService,
} from 'types/services/user.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';

const getWithURL = (params: IUserGetWithURLParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.USER_WITH.GET_WITH_URL(params.url),
    data: params,
  }).get<IUserGetResultService>();
};

const getMany = (params: IUserGetManyParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.USER_WITH.GET,
    data: params,
  }).get<IUserGetResultService[]>();
};

export const UserService = {
  getWithURL: getWithURL,
  getMany: getMany,
};
