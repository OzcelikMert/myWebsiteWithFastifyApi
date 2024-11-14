import { IUserModel } from '../models/user.model';
import { StatusId } from '@constants/status';
import { PermissionId } from '@constants/permissions';

export interface IUserPopulateService {
  _id: string;
  name: string;
  url: string;
  image: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export type IUserGetResultService = {
  isOnline?: boolean;
} & IUserModel;

export interface IUserGetWithURLParamService {
  url: string;
  statusId?: StatusId;
}

export interface IUserGetManyParamService {
  _id?: string[];
  statusId?: StatusId;
  email?: string;
  count?: number;
  page?: number;
  permissions?: PermissionId[];
}
