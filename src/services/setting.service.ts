import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  ISettingGetParamService,
  ISettingGetResultService,
} from 'types/services/setting.service';
import { PathUtil } from '@utils/path.util';
import { ApiRequest } from '@library/api/request';

const get = (params: ISettingGetParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SETTING_WITH.GET,
    data: params,
  }).get<ISettingGetResultService>();
};

export const SettingService = {
  get: get,
};
