import { ApiEndPoints } from '@constants/apiEndPoints';
import {
  ISubscriberAddParamService,
  ISubscriberDeleteWithEmailParamService,
  ISubscriberGetResultService,
  ISubscriberGetWithEmailParamService,
} from 'types/services/subscriber.service';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { ISubscriberModel } from 'types/models/subscriber.model';

const getWithEmail = (params: ISubscriberGetWithEmailParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.GET_WITH_EMAIL(params.email),
    data: params,
  }).get<ISubscriberGetResultService>();
};

const add = (params: ISubscriberAddParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.ADD,
    data: params,
  }).post<ISubscriberModel>();
};

const deleteWithEmail = (params: ISubscriberDeleteWithEmailParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.SUBSCRIBER_WITH.DELETE_WITH_EMAIL(params.email),
    data: params,
  }).delete();
};

export const SubscriberService = {
  getWithEmail: getWithEmail,
  add: add,
  deleteWithEmail: deleteWithEmail,
};
