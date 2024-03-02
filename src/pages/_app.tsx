import type {AppContext, AppProps} from 'next/app'
import React from "react";

import "styles/global.scss";

import "library/variable/array"
import "library/variable/string"
import "library/variable/number"
import "library/variable/date"
import "library/variable/math"

import cookieLib from "lib/cookie.lib";
import pathLib from "lib/path.lib";
import languageLib from "lib/language.lib";
import settingLib from "lib/setting.lib";
import themeLib from "lib/theme.lib";

import ComponentApp from "components/app";
import pageLib from "lib/page.lib";
import i18Lib from "lib/i18.lib";

function App(props: AppProps) {
    i18Lib.init(props.pageProps.appData)
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

        req.themeData = {
            ...req.themeData
        }

        req.appData = {
            ...req.appData
        };

        cookieLib.set(req);
        pathLib.set(req);
        await languageLib.get(req);
        await settingLib.getDefaultLanguageId(req);

        let langMatches = req.appData.apiPath.website.originalUrl.match(/\/([a-z]{2}\-[a-z]{2})/gm);
        if (langMatches && langMatches.length > 0) {
            let langKey = langMatches[0].slice(1);
            if (languageLib.check(req, res, langKey)) return {};
            cookieLib.setLanguageId(req, res)
            await settingLib.get(req);
            if (languageLib.isDefault(req, res)) return {};
        } else {
            if (languageLib.checkCookie(req, res)) return {};
            await settingLib.get(req);
        }

        await themeLib.getTools(req);

        return {
            pageProps: pageLib.getReturnData(req)
        }
    }

    return {};
}

export default App;