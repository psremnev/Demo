import { jsx as _jsx } from "react/jsx-runtime";
import { DnDListItemContainer } from 'dndContainer';
import { ORIENTATION_TYPE } from 'scrollContainer';
import { DEFAULT_CONTAINER_PADDING, DEFAULT_ITEM_PADDING } from 'List/constants';
import { useRef } from 'react';
export default function ({ items = [], idProperty = 'id', displayProperty = 'title', itemTemplate, onItemClick, itemsContainerPadding, itemPadding, canDrag = false, orientation = ORIENTATION_TYPE.VERTICAL, }) {
    const ItemTemplate = itemTemplate;
    const containerPadding = useRef(Object.assign(Object.assign({}, DEFAULT_CONTAINER_PADDING), itemsContainerPadding));
    const thisItemPadding = useRef(Object.assign(Object.assign({}, DEFAULT_ITEM_PADDING), itemPadding));
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
    return (_jsx("section", Object.assign({ className: "list-base", style: style }, { children: items.map((item, index) => {
            const id = item[idProperty];
            const value = item[displayProperty];
            return (_jsx(DnDListItemContainer, Object.assign({ id: id, canDrag: canDrag }, { children: _jsx("div", Object.assign({ className: "itemTemplate", style: {
                        cursor: onItemClick ? 'pointer' : 'default',
                        padding: `${thisItemPadding.current.top}px ${thisItemPadding.current.right}px
                 ${thisItemPadding.current.bottom}px ${thisItemPadding.current.left}px`,
                    }, onClick: () => onItemClick && onItemClick(item) }, { children: ItemTemplate ? (_jsx(ItemTemplate, { item: item, idProperty: idProperty, displayProperty: displayProperty, itemsContainerPadding: itemsContainerPadding, canDrag: canDrag })) : (_jsx("span", { children: value })) }), index) }), index));
        }) })));
}
