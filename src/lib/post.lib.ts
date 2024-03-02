import {PostTypeId} from "constants/postTypes";

export default {
    getTypeName(typeId: PostTypeId) {
        const indexOfS = Object.values(PostTypeId).indexOf(typeId);
        return Object.keys(PostTypeId)[indexOfS].toLowerCase();
    },
    getTypeId(typeName: string) {
        const indexOfS = Object.keys(PostTypeId).indexOf(typeName);
        return Number(Object.values(PostTypeId)[indexOfS]);
    }
}