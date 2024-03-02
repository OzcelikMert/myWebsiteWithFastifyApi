import Api from "./api";
import {ServicePages} from "constants/index";
import  {
    PostTermGetResultDocument,
    PostTermGetManyParamDocument,
    PostTermGetOneParamDocument,
} from "types/services/postTerm";

export default {
    getOne(params: PostTermGetOneParamDocument) {
        return Api.get<PostTermGetResultDocument | null>({
            url: [ServicePages.postTerm, "one", params.postTypeId.toString(), params.typeId.toString()],
            data: params
        });
    },
    getMany(params: PostTermGetManyParamDocument) {
        return Api.get<PostTermGetResultDocument[]>({
            url: [ServicePages.postTerm, "many", params.postTypeId.toString()],
            data: params
        });
    }
}