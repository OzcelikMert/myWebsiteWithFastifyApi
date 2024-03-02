import Api from "./api";
import {ServicePages} from "constants/index";
import {
    UserGetOneParamDocument,
    UserGetManyParamDocument,
    UserGetResultDocument,
} from "types/services/user";

export default {
    getOne(params: UserGetOneParamDocument) {
        return Api.get<UserGetResultDocument | null>({
            url: [ServicePages.user, "one"],
            data: params,
        });
    },
    getMany(params: UserGetManyParamDocument) {
        return Api.get<UserGetResultDocument[]>({
            url: [ServicePages.user, "many"],
            data: params,
        });
    }
}