import {HEADER_BASE_COLOR} from 'Articles/constants';
import 'Article/Article.scss';

export default function ({
  mode = 'view',
  title = '',
  description = '',
  backgroundColor = HEADER_BASE_COLOR,
  imageSrc,
  content = '',
  preloadData = null
}) {
  return (
    <section className={`article mode-${mode}`}>
      <header
        className=" article__header"
        style={{ background: backgroundColor }}
      >
        <span className="articleListItem__title">
          {title || preloadData.title}
        </span>
        <span className="articleListItem__description">
          {description || preloadData.description}
        </span>
        <img src={imageSrc} />
      </header>
      <section className="article__content">
        <span>{content}</span>
      </section>
    </section>
  );
}
