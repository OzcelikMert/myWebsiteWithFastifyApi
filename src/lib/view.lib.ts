import {IncomingMessage} from "http";
import postService from "services/post.service";
import viewService from "services/view.service";
import {PostTypeId} from "constants/postTypes";

export default {
    async set(req: IncomingMessage, _id: string, typeId: PostTypeId) {
        if(req.pageData) {
            await postService.updateOneView({
                _id: _id,
                typeId: typeId,
                langId: req.appData.languageId
            });

            await viewService.add({
                url: req.appData.apiPath.website.originalUrl,
                langId: req.appData.languageId
            });
        }
    }
}