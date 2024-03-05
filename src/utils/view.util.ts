import {IncomingMessage} from "http";
import {PostTypeId} from "constants/postTypes";
import {PostService} from "services/post.service";
import {ViewService} from "services/view.service";

const set = async (req: IncomingMessage, _id: string, typeId: PostTypeId) => {
    if(req.pageData) {
        await PostService.updateViewWithId({
            _id: _id,
            typeId: typeId,
            langId: req.appData.languageId
        });

        await ViewService.add({
            url: req.appData.apiPath.website.originalUrl,
            langId: req.appData.languageId
        });
    }
}

export default {
    set: set
}