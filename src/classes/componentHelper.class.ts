import {IComponentModel} from "types/models/component.model";
import {Component} from "react";
import {ISettingSocialMediaModel} from "types/models/setting.model";
import {SocialMediaKey} from "constants/socialMediaKeys";

export abstract class ComponentHelperClass<P, S> extends Component<P & {[key: string]: any}, S> {
    component?: IComponentModel
    socialMedia?: ISettingSocialMediaModel[]

    protected constructor(props: P & {[key: string]: any}) {
        super(props);

        if(this.props.component){
            this.component = this.props.component;
        }

        if(this.props.appData.settings.socialMedia){
            this.socialMedia = this.props.appData.settings.socialMedia;
        }
    }

    getComponentElementContents = (elementId: string) => {
        return this.component?.elements.findSingle("elementId", elementId)?.contents;
    }

    getSocialMediaURL = (elementId: SocialMediaKey) => {
        return this.socialMedia?.findSingle("elementId", elementId)?.url;
    }
}