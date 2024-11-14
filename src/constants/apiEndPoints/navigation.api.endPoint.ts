import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class NavigationApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.NAVIGATION) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
  GET_WITH_ID(_id: string) {
    return PathUtil.createPath(this.mainPath, `/get/${_id}`);
  }
}
