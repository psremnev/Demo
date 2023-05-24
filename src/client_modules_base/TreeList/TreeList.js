import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { BaseList } from 'list';
import TreeItemTemplate from './TreeItemTemplate';
import { ListLoader } from 'listLoader';
const getFilter = (filter) => {
    const filter_ = Object.assign({}, filter) || {};
    // parent - ид записей по которым нужно вернуть подзаписи
    return (filter_ === null || filter_ === void 0 ? void 0 : filter_.parent) ? filter_ : Object.assign(Object.assign({}, filter_), { parent: [] });
};
/**
 * @link TreeList/TreeList
 * @description Древовидный список
 */
export default function TreeList({ items = [], source, idProperty = 'id', displayProperty = 'title', itemTemplate, filter, navigation, onItemClick, expandedCallback, dataLoadCallback, itemsContainerPadding, canDrag, showScrollBar, showUpBtn, showShadow, backgroundColor = 'var(--default_background_color)', borderRadius = true }) {
    const [thisItems, setThisItems] = useState(items);
    const [thisFilter, setThisFilter] = useState(getFilter(filter));
    const treeItemDataLoadCallback = (items) => {
        const itemsIds = thisItems.map((item) => item.id);
        const newItems = [...thisItems];
        items.forEach((item) => {
            if (!itemsIds.includes(item.id)) {
                newItems.push(item);
            }
        });
        setThisItems(newItems);
    };
    const treeItemExpandedCallback = (params) => {
        // тут добавляем id в parent чтобы мметод БЛ вернул записи по раскрытым узлам
        const newFilter = Object.assign({}, thisFilter);
        if (!newFilter.parent) {
            newFilter.parent = [];
        }
        if (params.expanded) {
            newFilter.parent.push(params.id);
        }
        else {
            newFilter.parent = newFilter.parent.filter((id) => id !== params.id);
        }
        setThisFilter(newFilter);
        // items фильтр
        // прикладной коллбек
        expandedCallback && expandedCallback(newFilter.parent);
    };
    const ListWrapper = ({ items }) => {
        return _jsx(BaseList, { items: items, idProperty: idProperty, displayProperty: displayProperty, onItemClick: onItemClick, itemsContainerPadding: itemsContainerPadding, canDrag: canDrag, itemTemplate: (props) => _jsx(TreeItemTemplate, Object.assign({}, Object.assign(Object.assign({}, props), { itemTemplate,
                idProperty,
                displayProperty, items: thisItems, source, filter: thisFilter, expandedCallback: treeItemExpandedCallback, expandedItems: thisFilter.parent, dataLoadCallback: treeItemDataLoadCallback }))) });
    };
    const style = {
        background: backgroundColor,
        borderRadius: borderRadius ? 4 : 0,
        width: '100%',
        height: '100%'
    };
    return (_jsx("section", Object.assign({ className: 'treeList', style: style }, { children: _jsx(ListLoader, Object.assign({ source: source, filter: filter, navigation: navigation, items: items, dataLoadCallback: dataLoadCallback, showScrollBar: showScrollBar, showShadow: showShadow, showUpBtn: showUpBtn }, { children: ListWrapper })) })));
}
