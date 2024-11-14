import { ILanguageModel } from '../models/language.model';
import { StatusId } from '@constants/status';

export type ILanguageGetResultService = {} & ILanguageModel;

export interface ILanguageGetWithIdParamService {
  _id: string;
}

export interface ILanguageGetManyParamService {
  _id?: string[];
  statusId?: StatusId;
  shortKey?: string;
  locale?: string;
}
