import {IncomingMessage} from "http";
import {NavigationService} from "services/navigation.service";
import {StatusId} from "constants/status";

const getTools = async (req: IncomingMessage) => {
    let serviceResult = (await NavigationService.getMany({
        statusId: StatusId.Active,
        langId: req.appData.languageId
    }));

    if(serviceResult.status && serviceResult.data){
        req.navigations = serviceResult.data;
    }
}

export const ThemeUtil = {
    getTools: getTools,
};