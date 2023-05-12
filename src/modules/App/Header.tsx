import { useMemo, useState } from 'react';
import app from 'app.config.json';
import { LANG, THEME } from 'types';
import { getAppContext } from 'utils/getAppContext';
import { Button } from 'button';
import { Contacts } from 'contacts';
import { Settings } from 'settings';
import { openLink } from 'utils/openLink';
import { translate } from 'utils/translate';
import { Search } from 'search';
import 'App/Header.scss';

export default function Header() {
  const { theme, lang, changeAppContext } = getAppContext();
  const langItems = useMemo(
    () => [
      { id: LANG.RU, title: 'Ru' },
      { id: LANG.ENG, title: 'En' },
    ],
    []
  );
  const themeItems = useMemo(
    () => [
      { id: THEME.light, title: 'Light' },
      { id: THEME.dark, title: 'Dark' },
    ],
    []
  );

  const [appParams, setAppParams] = useState({ lang, theme });

  const accordion = [
    { title: translate('Статьи'), link: '/articles' },
    { title: translate('Демо'), link: '/demo' },
  ];

  const paramChanged = (selectedKeys, lang = true) => {
    const selectedKey = selectedKeys[0];
    const param = (lang ? langItems : themeItems).filter(
      (item) => item.id === selectedKey
    )[0].id;
    const newParams = { ...appParams, [lang ? 'lang' : 'theme']: param };
    setAppParams(newParams);
    changeAppContext(newParams);
  };

  const settingsItems = [
    {
      title: lang,
      selectedKey: lang,
      items: langItems,
      callback: (selectedKeys) => paramChanged(selectedKeys),
    },
    {
      title: theme,
      selectedKey: theme,
      items: themeItems,
      callback: (selectedKeys) => paramChanged(selectedKeys, false),
    },
  ];

  return (
    <header className="app-header">
      <section className="app-header__firstRow">
        <section className="app-header__firstRowTitle">
          <a href="/">{app.title}</a>
          <img src="public/header.gif" />
        </section>
        <section className="app-header__firstRowSearch">
          <Search />
        </section>
        <section className="app-header__firstRowRight">
          <Contacts
            vk="https://vk.com/p.remnev"
            telegram="https://t.me/Hhappy_47"
          />
          <Settings items={settingsItems} />
        </section>
      </section>
      <section className="app-header__secondRow">
        {accordion.map((item, index) => (
          <div
            key={index}
            className="app-header__accordionBtn marginRight-pre-m"
          >
            <Button
              backgroundColor="var(--second_color)"
              title={item.title}
              onClick={() => openLink(item.link)}
            />
          </div>
        ))}
      </section>
    </header>
  );
}
