import {ISubscriberModel} from "../models/subscriber.model";

export type ISubscriberGetResultService = {} & ISubscriberModel

export interface ISubscriberGetWithEmailParamService {
    email: string
}

export type ISubscriberAddParamService = {} & Omit<ISubscriberModel, "_id">

export interface ISubscriberDeleteWithEmailParamService {
    email: string
}