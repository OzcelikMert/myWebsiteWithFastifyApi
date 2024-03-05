import {ApiEndPoints} from "constants/apiEndPoints/index";
import {PathUtil} from "utils/path.util";

export class UserApiEndPoint {
    private mainPath: string;

    constructor(mainPath = ApiEndPoints.USER) {
        this.mainPath = mainPath;
    }

    GET_WITH_URL(url: string) { return PathUtil.createPath(this.mainPath, `/get/url/${url}`); }
}