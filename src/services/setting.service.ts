import Api from "./api";
import {ServicePages} from "constants/index";
import {
    SettingGetParamDocument,
    SettingGetResultDocument
} from "types/services/setting";

export default {
    get(params: SettingGetParamDocument) {
        return Api.get<SettingGetResultDocument>({
            url: [ServicePages.setting],
            data: params,
        });
    }
}