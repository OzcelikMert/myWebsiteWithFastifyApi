import { PathUtil } from '@utils/path.util';
import { ApiEndPoints } from '@constants/apiEndPoints/index';

export class ComponentApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.COMPONENT) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
  GET_WITH_KEY(key: string) {
    return PathUtil.createPath(this.mainPath, `/get/element-id/${key}`);
  }
}
