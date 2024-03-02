import {IncomingMessage} from "http";
import settingService from "services/setting.service";
import Variable from "library/variable";

export default {
    async get(req: IncomingMessage) {
        let resData = (await settingService.get({
            ...(req.appData.languageId ? {langId: req.appData.languageId} : {})
        }));

        if(resData.status && resData.data){
            req.appData.settings = resData.data;
        }
    },
    async getDefaultLanguageId(req: IncomingMessage) {
        let resData = (await settingService.get({projection: "general"}));

        if(resData.status && resData.data){
            req.appData.settings = resData.data;
        }

        if(Variable.isEmpty(req.appData.languageId)){
            req.appData.languageId = req.appData.settings.defaultLangId;
        }
    },
};