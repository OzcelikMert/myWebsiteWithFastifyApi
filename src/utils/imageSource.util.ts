import V from "@library/variable";
import {PathUtil} from "./path.util";

const getUploadedImageSrc = (imageName?: string): string => {
    return imageName && !V.isEmpty(imageName)
        ? (imageName.isUrl())
            ? imageName
            : PathUtil.getImageURL() + imageName
        : PathUtil.getStaticURL() + "empty.jpg"
}

const getFlagSrc = (flagName: string): string => {
    return PathUtil.getFlagURL() + flagName
}

export const ImageSourceUtil = {
    getUploadedImageSrc: getUploadedImageSrc,
    getFlagSrc: getFlagSrc
}