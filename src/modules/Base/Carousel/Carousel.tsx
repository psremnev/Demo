import { List } from 'list';
import { ICarousel } from 'Carousel/ICarousel';
import { ORIENTATION_TYPE } from 'scrollContainer';

/**
 * @link Carousel/Carousel
 * @description Горизонтальный список с навигацией
 * @param ICarousel
 */
export default function Carousel({ items, source, itemTemplate, backgroundColor }: ICarousel) {
  return (
    <List
      className="carousel"
      items={items}
      itemTemplate={itemTemplate}
      source={source}
      orientation={ORIENTATION_TYPE.HORIZONTAL}
      showNavBtns={true}
      showShadow={false}
      showScrollBar={false}
      backgroundColor={backgroundColor}
    />
  );
}
