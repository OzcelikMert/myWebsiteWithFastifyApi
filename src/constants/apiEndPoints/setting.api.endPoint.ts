import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class SettingApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.SETTING) {
    this.mainPath = mainPath;
  }

  get GET() {
    return PathUtil.createPath(this.mainPath, '/get');
  }
}
