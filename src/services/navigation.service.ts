import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  INavigationGetWithIdParamService,
  INavigationGetManyParamService,
  INavigationGetResultService,
} from 'types/services/navigation.service';
import { PathUtil } from '@utils/path.util';
import { ApiRequest } from '@library/api/request';

const getWithId = (params: INavigationGetWithIdParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.GET_WITH_ID(params._id),
    data: params,
  }).get<INavigationGetResultService>();
};

const getMany = (params: INavigationGetManyParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.NAVIGATION_WITH.GET,
    data: params,
  }).get<INavigationGetResultService[]>();
};

export const NavigationService = {
  getWithId: getWithId,
  getMany: getMany,
};
