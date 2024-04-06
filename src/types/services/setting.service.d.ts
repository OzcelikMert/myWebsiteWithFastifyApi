import {
    ISettingContactFormModel,
    ISettingModel, ISettingECommerceModel,
    ISettingSeoContentModel, ISettingSocialMediaModel,
    ISettingStaticContentContentModel,
    ISettingStaticContentModel
} from "../models/setting.model";
import {SettingProjectionKeys} from "@constants/settingProjections";

export type ISettingGetResultService = {
    seoContents?: ISettingSeoContentModel
    staticContents?: (Omit<ISettingStaticContentModel, "contents"> & { contents?: ISettingStaticContentContentModel })[]
} & Omit<ISettingModel, "seoContents" | "staticContents">

export type ISettingGetParamService = {
    langId?: string
    projection?: SettingProjectionKeys
}