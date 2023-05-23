import { HEADER_BASE_COLOR } from 'Articles/constants';
import 'Articles/ArticleListItem.scss'

export default function ArticleListItem({
  title = 'Title',
  additionalText = 'Additional Text',
  imageSrc = '',
  backgroundColor = HEADER_BASE_COLOR,
  previewText = 'Preview Text',
}) {

  return (
    <section className="articleListItem">
      <header
        className=" articleListItem__header"
        style={ { background: backgroundColor} }
      >
        <span className="articleListItem__title">{title}</span>
        <span className="articleListItem__additionalText">
          {additionalText}
        </span>
        <img src={imageSrc} />
      </header>
      <section className="articleListItem__previewContent">
        <span>{previewText}</span>
        <div className="articleListItem__previewContent-shadow"></div>
      </section>
    </section>
  );
}
