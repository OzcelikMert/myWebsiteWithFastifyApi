import { IUserPopulateService } from './user.service';
import {
  IComponentElementModel,
  IComponentModel,
} from 'types/models/component.model';
import { ComponentTypeId } from '@constants/componentTypes';

export interface IComponentAlternateService {
  langId: string;
}

export type IComponentGetResultService<T = { [key: string]: any }> = {
  authorId: IUserPopulateService;
  lastAuthorId: IUserPopulateService;
  elements: (IComponentElementModel & {
    alternates?: IComponentAlternateService[];
  })[];
} & Omit<IComponentModel<T>, 'elements' | 'authorId' | 'lastAuthorId'>;

export interface IComponentGetWithIdParamService {
  _id: string;
  langId?: string;
}

export interface IComponentGetWithKeyParamService {
  key: string;
  langId?: string;
}

export interface IComponentGetManyParamService {
  _id?: string[];
  key?: string[];
  langId?: string;
  typeId?: ComponentTypeId;
  withContent?: boolean;
  withCustomSort?: boolean;
}
