import {ApiEndPoints} from "constants/apiEndPoints";
import {
    ILanguageGetManyParamService,
    ILanguageGetResultService,
    ILanguageGetWithIdParamService,
} from "types/services/language.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {ILanguageModel} from "types/models/language.model";

const getWithId = (params: ILanguageGetWithIdParamService) =>{
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<ILanguageGetResultService>();
}

const getMany = (params: ILanguageGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.GET,
        data: params
    }).get<ILanguageGetResultService[]>();
}

const getFlags = (params: {}) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.LANGUAGE_WITH.GET_FLAGS,
        data: params
    }).get<string[]>();
}

export const LanguageService = {
    getWithId: getWithId,
    getMany: getMany,
    getFlags: getFlags
}