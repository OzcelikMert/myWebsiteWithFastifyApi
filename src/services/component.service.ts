import Api from "./api";
import {ServicePages} from "constants/index";
import {
    ComponentGetResultDocument,
    ComponentGetManyParamDocument,
    ComponentGetOneParamDocument,
} from "types/services/component";

export default {
    getOne(params: ComponentGetOneParamDocument) {
        return Api.get<ComponentGetResultDocument | null>({
            url: [ServicePages.component, "one"],
            data: params,
        });
    },
    getMany(params: ComponentGetManyParamDocument) {
        return Api.get<ComponentGetResultDocument[]>({
            url: [ServicePages.component, "many"],
            data: params,
        });
    },
}