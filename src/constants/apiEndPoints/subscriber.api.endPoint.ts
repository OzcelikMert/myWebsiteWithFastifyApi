import { ApiEndPoints } from '@constants/apiEndPoints/index';
import { PathUtil } from '@utils/path.util';

export class SubscriberApiEndPoint {
  private mainPath: string;

  constructor(mainPath = ApiEndPoints.SUBSCRIBER) {
    this.mainPath = mainPath;
  }

  get ADD() {
    return PathUtil.createPath(this.mainPath, '/add');
  }
  GET_WITH_EMAIL(email: string) {
    return PathUtil.createPath(this.mainPath, `/get/email/${email}`);
  }
  DELETE_WITH_EMAIL(email: string) {
    return PathUtil.createPath(this.mainPath, `/delete/email/${email}`);
  }
}
