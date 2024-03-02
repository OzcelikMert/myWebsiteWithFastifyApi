import Api from "./api";
import {ServicePages} from "constants/index";
import GalleryDocument from "types/services/gallery";

export default {
    get() {
        return Api.get<GalleryDocument[]>({
            url: [ServicePages.gallery],
        });
    },
}