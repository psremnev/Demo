import { HEADER_BASE_COLOR } from 'Article/constants';
import { Header } from 'header';
import { getBackgroundColor } from 'Article/getBackgroundColor';
import { useMemo } from 'react';
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
  item = null
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
    <section className={`article mode-${mode}`}>
      <header
        className="article__header"
        style={{
          background: backgroundColor,
          filter: 'contrast(0.7)',
          backgroundSize: 'cover'
        }}
      >
        <Header title={initItem.title} />
      </header>
      <section
        className="article__content"
        style={{ maxHeight: page ? '100%' : '100px', minHeight: '15px' }}
      >
        <span>{initItem.content}</span>
      </section>
    </section>
  );
}
