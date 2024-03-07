import {ApiEndPoints} from "constants/apiEndPoints";
import  {
    IPostTermGetResultService,
    IPostTermGetManyParamService,
    IPostTermGetWithIdParamService,
} from "types/services/postTerm.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";

const getWithId = (params: IPostTermGetWithIdParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.GET_WITH_ID(params._id),
        data: params
    }).get<IPostTermGetResultService>();
}

const getMany = (params: IPostTermGetManyParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.POST_TERM_WITH.GET,
        data: params
    }).get<IPostTermGetResultService[]>();
}

export const PostTermService = {
    getWithId: getWithId,
    getMany: getMany,
}