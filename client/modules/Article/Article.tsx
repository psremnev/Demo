import { HEADER_BASE_COLOR } from 'Article/constants';
import { Header } from 'header';
import { getBackgroundColor } from 'Article/getBackgroundColor';
import { useMemo } from 'react';
import { Button, BUTTONS_TYPE } from 'button';
import { openLink } from 'utils/openLink';
import 'Article/Article.scss';

/**
 * @link Article/Article
 * @description Статья
 */
export default function ({
  urlParams,
  mode = urlParams?.mode || 'view',
  page = urlParams?.page,
  preloadData = null,
  item = null,
  menuClickCallback
}) {
  const initItem = item || preloadData;
  const backgroundColor = useMemo(() => {
    if (initItem.image) {
      return `url(${item.image}})`;
    } else {
      return initItem._id
        ? getBackgroundColor(initItem._id)
        : HEADER_BASE_COLOR;
    }
  }, []);

  return (
    <section
      className={`article mode-${mode}`}
      style={{
        background: backgroundColor,
        filter: 'contrast(0.7)',
        backgroundSize: 'cover',
        boxShadow: '6px 6px 0px rgb(191 191 191 / 40%)',
        padding: 6,
        borderRadius: 6
      }}
    >
      <header className="article__header">
        {initItem.photo && (
          <img
            src={initItem.photo}
            style={{
              height: 45,
              width: 45,
              borderRadius: '50%',
              marginRight: 6
            }}
          />
        )}
        {initItem.author && (
          <div style={{ marginRight: 6 }}>
            <Header title={initItem.author} size={16} />
          </div>
        )}
        <Header title={initItem.title} />
      </header>
      <section
        className="article__content"
        style={{
          maxHeight: page ? '100%' : '100px',
          minHeight: '15px',
          overflow: 'hidden'
        }}
      >
        <span style={{ whiteSpace: 'unset' }}>{initItem.content}</span>
      </section>
      {!page && (
        <Button
          onClick={() =>
            openLink(`/article?id=${initItem._id}&mode=view&page=true`, true)
          }
          title="Показать еще"
          type={BUTTONS_TYPE.LINK}
          backgroundColor="transparent"
        />
      )}
      {!page && (
        <div style={{ position: 'absolute', top: 4, right: 8 }}>
          <Button
            onClick={() =>
              menuClickCallback && menuClickCallback('delete', initItem)
            }
            icon="ti-trash"
            type={BUTTONS_TYPE.ICON}
          />
        </div>
      )}
    </section>
  );
}
