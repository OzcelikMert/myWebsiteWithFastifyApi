import {ApiEndPoints} from "constants/apiEndPoints";
import {
    IViewAddParamService,
} from "types/services/view.service";
import ApiRequest from "library/api/request";
import {PathUtil} from "utils/path.util";
import {IViewModel} from "types/models/view.model";

const add = (params: IViewAddParamService) => {
    return new ApiRequest({
        apiUrl: PathUtil.getApiURL(),
        endPoint: ApiEndPoints.VIEW_WITH.ADD,
        data: params
    }).post<IViewModel>();
}

export const ViewService = {
    add: add,
}