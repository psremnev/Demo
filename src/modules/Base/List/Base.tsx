import { IListBase } from 'List/IList';
import { IListItem } from 'List/IListItem';
import { DnDListItemContainer } from 'dndContainer';
import { ORIENTATION_TYPE } from 'scrollContainer';
import { DEFAULT_PADDING } from 'List/constants';
import { useRef } from 'react';

export default function ({
  items = [],
  idProperty = 'id',
  displayProperty = 'title',
  itemTemplate,
  onItemClick,
  itemsContainerPadding,
  canDrag = false,
  orientation = ORIENTATION_TYPE.VERTICAL,
}: IListBase) {
  const ItemTemplate = itemTemplate;
  const padding = useRef({ ...DEFAULT_PADDING, ...itemsContainerPadding });

  /**
   * Стиль для списка
   */
  const style = {
    display: 'flex',
    flexDirection: orientation === ORIENTATION_TYPE.VERTICAL ? 'column' : 'row',
    padding: `${padding.current.top}px ${padding.current.right}px
                 ${padding.current.bottom}px ${padding.current.left}px`,
    width: '100%',
  };

  return (
    <section className="list-base" style={style}>
      {items.map((item: IListItem, index: number) => {
        const id = item[idProperty];
        const value = item[displayProperty];
        return (
          <DnDListItemContainer key={index} id={id} canDrag={canDrag}>
            <div
              className="itemTemplate"
              key={index}
              onClick={() => onItemClick && onItemClick(item)}
            >
              {ItemTemplate ? (
                <ItemTemplate
                  item={item}
                  idProperty={idProperty}
                  displayProperty={displayProperty}
                  itemsContainerPadding={itemsContainerPadding}
                  canDrag={canDrag}
                />
              ) : (
                <span>{value}</span>
              )}
            </div>
          </DnDListItemContainer>
        );
      })}
    </section>
  );
}
