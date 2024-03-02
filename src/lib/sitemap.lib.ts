import {PostTypeId} from "constants/postTypes";
import {PageTypeId} from "constants/pageTypes";
import postLib from "lib/post.lib";
import pagePathLib from "lib/pagePath.lib";

export default {
    getLoc(...strings: string[]) {
        return pagePathLib.setPath.apply(this.getLoc, strings).slice(1)
    },
    getSitemapPostLoc(typeId: PostTypeId, url: string, pageTypeId?: PageTypeId) {
        let sitemapName = typeId == PostTypeId.Page ? "" : `${postLib.getTypeName(typeId)}/`;
        url = pageTypeId == PageTypeId.HomePage ? "" : url;
        return `${sitemapName}${url}`;
    },
    getSitemapPostPriority(typeId: PostTypeId, pageTypeId?: PageTypeId) {
        let priority = "0.5";

        if (typeId == PostTypeId.Page) {
            priority = "0.8";
        }

        if (pageTypeId == PageTypeId.HomePage) {
            priority = "1.0";
        }

        return priority;
    }
}