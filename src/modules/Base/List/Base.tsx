import { IListBase } from 'List/IList';
import { IListItem } from 'List/IListItem';
import { DnDListItemContainer } from 'dndContainer';
import { ORIENTATION_TYPE } from 'scrollContainer';
import { DEFAULT_CONTAINER_PADDING, DEFAULT_ITEM_PADDING } from 'List/constants';
import { useRef } from 'react';

export default function ({
  items = [],
  idProperty = 'id',
  displayProperty = 'title',
  itemTemplate,
  onItemClick,
  itemsContainerPadding,
  itemPadding,
  canDrag = false,
  orientation = ORIENTATION_TYPE.VERTICAL,
}: IListBase) {
  const ItemTemplate = itemTemplate;
  const containerPadding = useRef({ ...DEFAULT_CONTAINER_PADDING, ...itemsContainerPadding });
  const thisItemPadding = useRef({ ...DEFAULT_ITEM_PADDING, ...itemPadding });

  /**
   * Стиль для списка
   */
  const style = {
    display: 'flex',
    flexDirection: orientation === ORIENTATION_TYPE.VERTICAL ? 'column' : 'row',
    padding: `${containerPadding.current.top}px ${containerPadding.current.right}px
                 ${containerPadding.current.bottom}px ${containerPadding.current.left}px`,
    width: '100%'
  };

  return (
    <section className="list-base" style={style}>
      {items.map((item: IListItem, index: number) => {
        const id = item[idProperty];
        const value = item[displayProperty];
        return (
          <DnDListItemContainer key={index} id={id} canDrag={canDrag}>
            <div
              key={index}
              className="itemTemplate"
              style={{
                padding: `${thisItemPadding.current.top}px ${thisItemPadding.current.right}px
                 ${thisItemPadding.current.bottom}px ${thisItemPadding.current.left}px`,
              }}
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
