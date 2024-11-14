import { Component } from 'react';
import { SocialMediaKey } from '@constants/socialMediaKeys';
import { IPagePropCommon } from 'types/pageProps';
import { IComponentElementContentModel } from 'types/models/component.model';
import { IncomingMessage } from 'http';
import { IComponentGetResultService } from 'types/services/component.service';

type IPageProps = {
  component?: IComponentGetResultService;
} & IPagePropCommon;

export class ComponentHelperClass<P = {}, S = {}> extends Component<
  P & IPageProps,
  S
> {
  protected constructor(props: P & IPageProps) {
    super(props);
  }

  getComponentElementContents = (
    key: string
  ): IComponentElementContentModel | undefined => {
    return this.props.component?.elements.findSingle('key', key)?.contents;
  };

  getSocialMediaURL = (key: SocialMediaKey): string | undefined => {
    return this.props.appData.settings.socialMedia?.findSingle('key', key)?.url;
  };

  static initComponentServerSideProps?: (
    req: IncomingMessage,
    component: IComponentGetResultService
  ) => Promise<void>;
}
