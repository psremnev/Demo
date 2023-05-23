import app from 'app.config.json';
import { App } from 'app';
import { useState, useEffect } from 'react';
import AppContext from 'App/context/app';
import { THEME, THEME_COLOR, LANG } from 'types';
import 'Index.scss';

export default function Index({ contentData }) {
  let loadState;
  try {
    loadState = JSON.stringify(contentData);
  } catch (e) {
    console.error(e);
  }

  const { module, options, urlInfo, cookies, hasSearch } = contentData;

  const changeAppParams = async (params) => {
    const newParams = { ...appParams, ...params };
    setAppParamsInCookie(newParams);
    await setAppParams(newParams);
  };

  const [appParams, setAppParams] = useState({
    theme: cookies.theme || THEME.dark,
    lang: cookies.lang || LANG.RU,
    urlInfo,
    changeAppContext: changeAppParams,
  });

  const setAppParamsInCookie = (newParams) => {
    document.cookie = `lang=${newParams.lang}`;
    document.cookie = `theme=${newParams.theme}`;
    cookies.lang = newParams.lang;
    cookies.theme = newParams.theme;
  };

  useEffect(() => {
    setAppParamsInCookie(appParams);
  }, []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{app.title}</title>
        <link rel="stylesheet" href="/style.css"></link>
        <script type="module" src="/client.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__STATE__ = ${JSON.stringify(loadState)}`,
          }}
        ></script>
      </head>
      <body
        style={{
          background:
            appParams.theme === THEME.light
              ? THEME_COLOR.light
              : THEME_COLOR.dark,
        }}
      >
        <AppContext.Provider value={appParams}>
          <App contentData={{ options, module, hasSearch }} />
        </AppContext.Provider>
      </body>
    </html>
  );
}
