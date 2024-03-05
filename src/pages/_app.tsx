import type {AppContext, AppProps} from 'next/app'
import React from "react";

import "styles/global.scss";

import "library/variable/array"
import "library/variable/string"
import "library/variable/number"
import "library/variable/date"
import "library/variable/math"

import ComponentApp from "components/app";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {IPagePropCommon} from "types/pageProps";
import {CookieUtil} from "utils/cookie.util";
import {PathUtil} from "utils/path.util";
import {LanguageUtil} from "utils/language.util";
import {SettingUtil} from "utils/setting.util";
import {ThemeUtil} from "utils/theme.util";
import {PageUtil} from "utils/page.util";

function i18Init(pageProps: IPagePropCommon){
    const language = i18n.use(initReactI18next);
    language.init({
        resources: {
            default: {translation: pageProps.appData.settings.staticContents?.reduce((a: any, v) => ({...a, [v.elementId]: v.contents?.content || ""}), {}) || {}}
        },
        keySeparator: false,
        lng: "default",
        fallbackLng: "default",
        interpolation: {
            escapeValue: false
        }
    });
}

function App(props: AppProps) {
    i18Init(props.pageProps)
    return (
        <ComponentApp {...props.pageProps} Component={props.Component} router={props.router}/>
    )
}

App.getInitialProps = async (props: AppContext) => {
    if (typeof window === "undefined" && props.ctx.req && props.ctx.res) {
        let req = props.ctx.req;
        let res = props.ctx.res;

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        );

        req.appData = {
            ...req.appData
        };

        //CookieUtil.set(req);
        PathUtil.set(req);
        await LanguageUtil.get(req);
        await SettingUtil.getDefaultLanguageId(req);

        let langMatches = req.appData.apiPath.website.originalUrl.match(/\/([a-z]{2}\-[a-z]{2})/gm);
        if (langMatches && langMatches.length > 0) {
            let langKey = langMatches[0].slice(1);
            if (LanguageUtil.check(req, res, langKey)) return {};
            CookieUtil.setLanguageId(req, res)
            await SettingUtil.get(req);
            if (LanguageUtil.isDefault(req, res)) return {};
        } else {
            if (LanguageUtil.checkCookie(req, res)) return {};
            await SettingUtil.get(req);
        }

        await ThemeUtil.getTools(req);

        return {
            pageProps: PageUtil.getReturnData(req)
        }
    }

    return {};
}

export default App;