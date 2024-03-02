import Api from "./api";
import {ServicePages} from "constants/index";
import {
    NavigationGetOneParamDocument,
    NavigationGetManyParamDocument,
    NavigationGetResultDocument
} from "types/services/navigation";

export default {
    getOne(params: NavigationGetOneParamDocument) {
        return Api.get<NavigationGetResultDocument | null>({
            url: [ServicePages.navigation, "one"],
            data: params,
        });
    },
    getMany(params: NavigationGetManyParamDocument) {
        return Api.get<NavigationGetResultDocument[]>({
            url: [ServicePages.navigation, "many"],
            data: params,
        });
    }
}