import type {AppContext, AppProps} from 'next/app'
import React from "react";

import "@styles/global.scss";

import "@library/variable/array"
import "@library/variable/string"
import "@library/variable/number"
import "@library/variable/date"
import "@library/variable/math"

import ComponentApp from "@components/app";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {CookieUtil} from "@utils/cookie.util";
import {LanguageUtil} from "@utils/language.util";
import {PageUtil} from "@utils/page.util";
import {LanguageService} from "@services/language.service";
import {StatusId} from "@constants/status";
import {SettingService} from "@services/setting.service";
import {URLUtil} from "@utils/url.util";
import {NavigationService} from "@services/navigation.service";
import {ISettingGetResultService} from "types/services/setting.service";

async function i18Init(staticContents: ISettingGetResultService["staticContents"]) {
    const language = i18n.use(initReactI18next);
    await language.init({
        resources: {
            default: {
                translation: staticContents?.reduce((a: any, v) => ({
                    ...a,
                    [v.key]: v.contents?.content || ""
                }), {}) || {}
            }
        },
        keySeparator: false,
        lng: "default",
        fallbackLng: "default",
        interpolation: {
            escapeValue: false,
        },
    });

    return language.t;
}

function App(props: AppProps) {
    i18Init(props.pageProps.appData.settings.staticContents);
    return (
        <ComponentApp {...props.pageProps} Component={props.Component} router={props.router}/>
    )
}

App.getInitialProps = async (props: AppContext) => {
    if (typeof window === "undefined" && props.ctx.req && props.ctx.res) {
        let req = props.ctx.req;
        let res = props.ctx.res;

        req.pageData = {};
        req.appData = {};
        req.getURL = URLUtil.get(req);
        console.log(req.getURL)

        // Get all languages
        req.appData.languages = (await LanguageService.getMany({statusId: StatusId.Active})).data ?? [];

        // Find default language
        let foundDefaultLanguage = req.appData.languages.findSingle("isDefault", true);
        if (foundDefaultLanguage) {
            req.appData.defaultLangId = foundDefaultLanguage._id;
            req.appData.selectedLangId = foundDefaultLanguage._id;
            req.appData.selectedLangCode = LanguageUtil.getCode(foundDefaultLanguage);

            // Check is there cookie lang code
            if (req.cookies.langCode) {
                // Check cookie lang code and default lang code is same
                if (req.appData.selectedLangCode == req.cookies.langCode) {
                    CookieUtil.deleteLangId(req, res);
                    URLUtil.move(res, URLUtil.replaceLanguageCode({
                        url: req.getURL,
                        withBase: true
                    }));
                    return {};
                } else {
                    // Find cookie lang code
                    let langKeys = req.cookies.langCode.split("-");
                    let foundCookieLanguagesWithKey = req.appData.languages.findMulti("shortKey", langKeys[0]);
                    let foundCookieLanguageWithLocale = foundCookieLanguagesWithKey.findSingle("locale", langKeys[1]);
                    // Check lang code is correct
                    if (foundCookieLanguageWithLocale) {
                        req.appData.selectedLangId = foundCookieLanguageWithLocale._id;
                        req.appData.selectedLangCode = req.cookies.langCode;
                        if(req.cookies.langId != req.appData.selectedLangId){
                            CookieUtil.setLangId(req, res);
                        }
                    } else {
                        URLUtil.move(res, URLUtil.replaceLanguageCode({
                            url: req.getURL,
                            withBase: true
                        }));
                        return {};
                    }
                }
            } else {
                // Check is there a cookie lang id and check is it same with default lang id
                if (req.cookies.langId && req.cookies.langId != req.appData.selectedLangId) {
                    let foundCookieLanguageWithId = req.appData.languages.findSingle("_id", req.cookies.langId);
                    if (foundCookieLanguageWithId) {
                        URLUtil.move(res, URLUtil.replaceLanguageCode({
                            url: req.getURL,
                            newLanguage: foundCookieLanguageWithId,
                            withBase: true
                        }));
                        return {};
                    }
                }
            }

            let serviceResultSettings = await SettingService.get({langId: req.appData.selectedLangId});

            if (serviceResultSettings.status && serviceResultSettings.data) {
                req.appData.settings = serviceResultSettings.data;
                await PageUtil.initToolComponentProps(req);
            }
        }

        return {
            pageProps: PageUtil.getCommonProps(req)
        }
    }

    return {};
}

export default App;