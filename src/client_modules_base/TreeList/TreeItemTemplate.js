var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { BaseList } from 'list';
import Expander from './Expander';
import { Button, BUTTONS_TYPE } from 'button';
import 'TreeList/TreeItemTemplate.scss';
const getItems = (items, currentItem) => {
    return items.filter((item) => item.parent === currentItem.id);
};
const getExpandedByExpandedItems = (expandedItems, currentItem) => {
    return expandedItems.includes(currentItem.id);
};
export default function TreeItemTemplate({ displayProperty, itemTemplate, source, items = [], filter = {}, item, onItemClick, expandedCallback, expandedItems, dataLoadCallback, canDrag }) {
    const [thisItems, setThisItems] = useState(getItems(items, item));
    const [showLoadMore, setShowLoadMore] = useState([]);
    const [isExpanded, setIsExpanded] = useState(getExpandedByExpandedItems(expandedItems, item));
    const thisFilter = useMemo(() => {
        return Object.assign(Object.assign({}, filter), { parent: item.id });
    }, [filter]);
    const ItemTemplate = itemTemplate;
    const onExpanderClick = () => __awaiter(this, void 0, void 0, function* () {
        const expanded = !isExpanded;
        expandedCallback({ id: item.id, expanded });
        expanded && (yield loadData());
        setIsExpanded(expanded);
    });
    const loadData = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const loadItems = yield source.call('Query', thisFilter);
            setShowLoadMore(!!loadItems.length); // тут нужно какую-то мета дату возвращать чтобы скрывать сразу
            setThisItems(loadItems);
            dataLoadCallback(loadItems);
        }
        catch (e) {
            console.error(e);
        }
    });
    return (_jsxs("section", Object.assign({ className: "treeItemTemplate" }, { children: [_jsxs("div", Object.assign({ className: "treeItemTemplate-header" }, { children: [item.hasChildren && (_jsx(Expander, { expanded: isExpanded, onClick: onExpanderClick })), _jsx("div", { children: ItemTemplate ? (_jsx(ItemTemplate, { item: item })) : (_jsx("span", { children: item[displayProperty] })) })] })), _jsxs("div", Object.assign({ style: { marginLeft: 30 } }, { children: [item.hasChildren && isExpanded && (_jsx(BaseList, { items: thisItems, displayProperty: displayProperty, onItemClick: onItemClick, itemsContainerPadding: { top: 0, left: 0, right: 0, bottom: 0 }, canDrag: canDrag, itemTemplate: (props) => (_jsx(TreeItemTemplate, Object.assign({}, Object.assign(Object.assign({}, props), { displayProperty,
                            source,
                            filter,
                            items,
                            itemTemplate,
                            expandedCallback,
                            expandedItems,
                            dataLoadCallback })))) })), isExpanded && item.hasChildren && showLoadMore && (_jsx(Button, { className: "treeItemTemplate-load", type: BUTTONS_TYPE.LINK, onClick: loadData, title: "More", backgroundColor: "var(--transparent_background_color)" }))] }))] })));
}
