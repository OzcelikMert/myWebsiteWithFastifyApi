import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class PostTermApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.POST_TERM) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
  GET_WITH_URL(url: string) {
    return PathUtil.createPath(this.mainPath, `/get/url/${url}`);
  }
  UPDATE_VIEW_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/update/view/${_id}`);
  }
}
