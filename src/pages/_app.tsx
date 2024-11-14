import type { AppContext, AppProps } from 'next/app';
import React from 'react';

import '@styles/global.scss';

import '@library/variable/array';
import '@library/variable/string';
import '@library/variable/number';
import '@library/variable/date';
import '@library/variable/math';

import ComponentApp from '@components/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { PageSSRUtil } from '@utils/page.ssr.util';
import { SettingService } from '@services/setting.service';
import { IComponentGetResultService } from 'types/services/component.service';
import { ComponentKey } from '@constants/componentKeys';
import { LanguageSSRUtil } from '@utils/language.ssr.util';
import { UrlSSRUtil } from '@utils/url.ssr.util';

async function i18Init(staticContents: IComponentGetResultService) {
  const language = i18n.use(initReactI18next);
  await language.init({
    resources: {
      default: {
        translation:
          staticContents.elements.reduce(
            (a: any, v) => ({
              ...a,
              [v.key]: v.contents?.content || '',
            }),
            {}
          ) || {},
      },
    },
    keySeparator: false,
    lng: 'default',
    fallbackLng: 'default',
    interpolation: {
      escapeValue: false,
    },
  });

  return language.t;
}

function App(props: AppProps) {
  const componentStaticContents =
    props.pageProps.pageData.publicComponents.findSingle(
      'key',
      ComponentKey.StaticContents
    );
  if (componentStaticContents) {
    i18Init(componentStaticContents);
  }
  return (
    <ComponentApp
      {...props.pageProps}
      Component={props.Component}
      router={props.router}
    />
  );
}

App.getInitialProps = async (props: AppContext) => {
  if (typeof window === 'undefined' && props.ctx.req && props.ctx.res) {
    const req = props.ctx.req;
    const res = props.ctx.res;

    req.pageData = {};
    req.appData = {};
    req.getURL = UrlSSRUtil.get(req);
    console.log(req.getURL);

    req.pageData.isSitemap =
      req.getURL.asPath.includes('/sitemap.xml') ||
      req.getURL.asPath.includes('/sitemaps/');

    if (!req.pageData.isSitemap) {
      await PageSSRUtil.initPublicComponents(req);
    }

    const isLangInit = await LanguageSSRUtil.init(req, res);
    if (!isLangInit) {
      return {};
    }

    const serviceResultSettings = await SettingService.get({
      langId: req.appData.selectedLangId,
    });

    if (serviceResultSettings.status && serviceResultSettings.data) {
      req.appData.settings = serviceResultSettings.data;
    }

    return {
      pageProps: PageSSRUtil.getProps(req),
    };
  }

  return {};
};

export default App;
