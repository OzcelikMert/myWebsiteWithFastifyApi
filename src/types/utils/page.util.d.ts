import { IncomingMessage } from 'http';
import { PageTypeId } from '@constants/pageTypes';

export interface IPageGetParamUtil {
  req: IncomingMessage;
  url?: string;
  typeId?: PageTypeId;
  increaseView?: boolean;
}
