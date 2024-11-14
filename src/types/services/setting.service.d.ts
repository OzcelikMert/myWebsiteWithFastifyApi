import {
  ISettingModel,
  ISettingSeoContentModel,
} from '../models/setting.model';
import { SettingProjectionKeys } from '@constants/settingProjections';

export type ISettingGetResultService = {
  seoContents?: ISettingSeoContentModel;
} & Omit<ISettingModel, 'seoContents'>;

export type ISettingGetParamService = {
  langId?: string;
  projection?: SettingProjectionKeys;
};
