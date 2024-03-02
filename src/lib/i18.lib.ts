import i18n from "i18next";
import { getI18n } from 'react-i18next';
import {initReactI18next} from "react-i18next";
import {AppDataDocument} from "types/pageProps";

export default {
    init(appData: AppDataDocument) {
        const language = i18n.use(initReactI18next);
        language.init({
            resources: {
                default: {translation: appData.settings.staticLanguages?.reduce((a: any, v) => ({...a, [v.langKey]: v.contents?.content || ""}), {}) || {}}
            },
            keySeparator: false,
            lng: "default",
            fallbackLng: "default",
            interpolation: {
                escapeValue: false
            }
        });
    },
    get(key: string) {
        return getI18n().t(key).toString();
    }
}