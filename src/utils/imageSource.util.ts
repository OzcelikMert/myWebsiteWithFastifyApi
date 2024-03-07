import V from "library/variable";
import {PathUtil} from "./path.util";

const getUploadedImageSrc = (imageName?: string): string => {
    return imageName && !V.isEmpty(imageName)
        ? (imageName.isUrl())
            ? imageName
            : PathUtil.getImageURL() + imageName
        : PathUtil.getStaticURL() + "empty.jpg"
}

export const ImageSourceUtil = {
    getUploadedImageSrc: getUploadedImageSrc
}