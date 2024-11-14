import { ApiEndPoints } from '@constants/apiEndPoints';
import { ApiRequest } from '@library/api/request';
import { PathUtil } from '@utils/path.util';
import { IMailerSendParamService } from 'types/services/mailer.service';

const send = (params: IMailerSendParamService) => {
  return new ApiRequest({
    apiUrl: PathUtil.getApiURL(),
    endPoint: ApiEndPoints.MAILER_WITH.SEND,
    data: params,
  }).post();
};

export const MailerService = {
  send: send,
};
