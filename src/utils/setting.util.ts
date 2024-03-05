import {IncomingMessage} from "http";
import Variable from "library/variable";
import {SettingService} from "services/setting.service";
import {SettingProjectionKeys} from "constants/settingProjections";

const get = async (req: IncomingMessage) =>  {
    let resData = (await SettingService.get({
        ...(req.appData.languageId ? {langId: req.appData.languageId} : {})
    }));

    if(resData.status && resData.data){
        req.appData.settings = resData.data;
    }
}

const getDefaultLanguageId = async (req: IncomingMessage) =>  {
    let resData = (await SettingService.get({projection: SettingProjectionKeys.General}));

    if(resData.status && resData.data){
        req.appData.settings = resData.data;
    }

    if(Variable.isEmpty(req.appData.languageId)){
        req.appData.languageId = req.appData.settings.defaultLangId;
    }
}

export const SettingUtil = {
    get: get,
    getDefaultLanguageId: getDefaultLanguageId,
};