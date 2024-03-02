import Api from "./api";
import {ServicePages} from "constants/index";
import {
    PostGetCountParamDocument,
    PostGetManyParamDocument, PostGetManyResultDocument,
    PostGetOneParamDocument, PostGetOneResultDocument, PostUpdateOneViewParamDocument,
} from "types/services/post";

export default {
    getOne(params: PostGetOneParamDocument){
        return Api.get<PostGetOneResultDocument | null>({
            url: [ServicePages.post, "one", params.typeId.toString()],
            data: params
        });
    },
    getMany(params: PostGetManyParamDocument){
        return Api.get<PostGetManyResultDocument[]>({
            url: [ServicePages.post, "many"],
            data: params
        });
    },
    getCount(params: PostGetCountParamDocument){
        return Api.get<number>({
            url: [ServicePages.post, params.typeId.toString(), "count"],
            data: params
        });
    },
    updateOneView(params: PostUpdateOneViewParamDocument) {
        return Api.put({
            url: [ServicePages.post, "one", params.typeId.toString(), params._id.toString(), "view"],
            data: params
        });
    }
}