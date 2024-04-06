import {ApiEndPoints} from "@constants/apiEndPoints/index";
import {PathUtil} from "@utils/path.util";

export class ViewApiEndPoint {
    private mainPath: string;

    constructor(mainPath = ApiEndPoints.VIEW) {
        this.mainPath = mainPath;
    }

    get ADD() { return PathUtil.createPath(this.mainPath, "/add"); }
}