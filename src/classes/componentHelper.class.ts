import {Component} from "react";
import {SocialMediaKey} from "constants/socialMediaKeys";
import {IPagePropCommon} from "types/pageProps";
import {IComponentElementContentModel, IComponentModel} from "types/models/component.model";
import {IncomingMessage} from "http";
import {IComponentGetResultService} from "types/services/component.service";
import {ISettingSocialMediaModel} from "types/models/setting.model";

type IPageProps = {
    component?: IComponentModel | IComponentGetResultService;
} & IPagePropCommon;

export class ComponentHelperClass<P = {}, S = {}> extends Component<P & IPageProps, S> {
    protected constructor(props: P & IPageProps) {
        super(props);
    }

    getComponentElementContents = (elementId: string): IComponentElementContentModel | undefined => {
        return this.props.component?.elements.findSingle("elementId", elementId)?.contents;
    }

    getSocialMediaURL = (elementId: SocialMediaKey): string | undefined => {
        return this.props.appData.settings.socialMedia?.findSingle("elementId", elementId)?.url;
    }

    static initComponentServersideProps?: (req: IncomingMessage, component: IComponentModel | IComponentGetResultService) => Promise<void>;
}