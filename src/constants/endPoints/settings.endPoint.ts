import {EndPoints} from "constants/endPoints/index";
import {PathUtil} from "utils/path.util";

export class SettingsEndPoint {
    private mainPath: string;

    constructor(mainPath = EndPoints.SETTINGS) {
        this.mainPath = mainPath;
    }

    get SEO() { return PathUtil.createPath(this.mainPath, "/seo"); };
    get GENERAL() { return PathUtil.createPath(this.mainPath, "/general"); };
    get PROFILE() { return PathUtil.createPath(this.mainPath, "/profile"); };
    get CHANGE_PASSWORD() { return PathUtil.createPath(this.mainPath, "/change-password"); };
    get STATIC_CONTENTS() { return PathUtil.createPath(this.mainPath, "/static-contents"); };
    get SUBSCRIBERS() { return PathUtil.createPath(this.mainPath, "/subscribers"); };
    get CONTACT_FORMS() { return PathUtil.createPath(this.mainPath, "/contact-forms"); };
    get SOCIAL_MEDIA() { return PathUtil.createPath(this.mainPath, "/social-media"); };
}