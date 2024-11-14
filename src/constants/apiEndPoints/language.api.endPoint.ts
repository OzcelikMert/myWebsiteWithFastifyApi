import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class LanguageApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.LANGUAGE) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  get GET_DEFAULT() {
    return PathUtil.createPath(this.mainPath, '/get/default');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
  get GET_FLAGS() {
    return PathUtil.createPath(this.mainPath, '/get/flags');
  }
}
