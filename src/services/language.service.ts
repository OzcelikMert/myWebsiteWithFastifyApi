import Api from "./api";
import {ServicePages} from "constants/index";
import  {
    LanguageGetOneParamDocument,
    LanguageGetResultDocument, LanguageGetManyParamDocument,
} from "types/services/language";

export default {
    getOne(params: LanguageGetOneParamDocument){
        return Api.get<LanguageGetResultDocument | null>({
            url: [ServicePages.language, "one"],
            data: params
        });
    },
    getMany(params: LanguageGetManyParamDocument) {
        return Api.get<LanguageGetResultDocument[]>({
            url: [ServicePages.language, "many"],
            data: params
        });
    },
    getFlags(params: {}) {
        return Api.get<string[]>({
            url: [ServicePages.language, "flags"],
            data: params
        });
    }
}