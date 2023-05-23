import { HEADER_BASE_COLOR } from 'Articles/constants';
import 'Articles/ArticleListItem.scss'

export default function ArticleListItem({
  title = '',
  description = '',
  imageSrc = '',
  backgroundColor = HEADER_BASE_COLOR,
  previewText = '',
}) {
  return (
    <section className="articleListItem">
      <header
        className=" articleListItem__header"
        style={{ background: backgroundColor }}
      >
        <span className="articleListItem__title">{title}</span>
        <span className="articleListItem__description">{description}</span>
        <img src={imageSrc} />
      </header>
      <section className="articleListItem__previewContent">
        <span>{previewText}</span>
        <div className="articleListItem__previewContent-shadow"></div>
      </section>
    </section>
  );
}
