import {useState, useEffect} from 'react';
import {Loader} from 'loader';
import {ScrollContainer} from 'scrollContainer';
import {ITreeListOptions} from './ITreeListOptions';
import {BaseList} from 'list';
import TreeItemTemplate from './TreeItemTemplate';
import {ListLoader} from 'listLoader';

const getFilter = (filter) => {
    const filter_ = filter || {};
    // parent - ид записей по которым нужно вернуть подзаписи
    return filter_?.parent ? filter_ : {...filter_, parent: []};
}
 
/**
 * @link TreeList/TreeList
 * @description Древовидный список
 */
export default function TreeList({
    items = [],
    source,
    idProperty = 'id',
    displayProperty = 'title',
    itemTemplate,
    filter,
    navigation,
    onItemClick,
    expandedCallback,
    dataLoadCallback,
    itemsContainerPadding,
    canDrag,
    showScrollBar,
    showUpBtn,
    showShadow,
    backgroundColor = 'var(--default_background_color)',
    borderRadius = true
}: ITreeListOptions) {
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
     }

    const treeItemExpandedCallback = (params: {id: string, expanded: boolean}) => {
        // тут добавляем id в parent чтобы мметод БЛ вернул записи по раскрытым узлам
        const newFilter = {...thisFilter};
        if (!newFilter.parent) {
            newFilter.parent = []
        }
        if (params.expanded){
            newFilter.parent.push(params.id)
        } else {
           newFilter.parent = newFilter.parent.filter((id) => id !== params.id);
        }
        setThisFilter(newFilter);
        // items фильтр
        // прикладной коллбек
        expandedCallback && expandedCallback(newFilter.parent);
    }
    
    const ListWrapper = ({items}) => {
        return <BaseList items={items}
                         idProperty={idProperty}
                         displayProperty={displayProperty}
                         onItemClick={onItemClick}
                         itemsContainerPadding={itemsContainerPadding}
                         canDrag={canDrag}
                         itemTemplate={ (props) => 
                         <TreeItemTemplate { 
                                ...{
                                    ...props,
                                    itemTemplate,
                                    idProperty,
                                    displayProperty,
                                    items: thisItems,
                                    source,
                                    filter,
                                    expandedCallback: treeItemExpandedCallback,
                                    expandedItems: thisFilter.parent,
                                    dataLoadCallback: treeItemDataLoadCallback
                                } 
                            }
                         />
                    } 
                />
    }

    const style = {
        background: backgroundColor,
        borderRadius: borderRadius ? 4 : 0,
        width: '100%',
        height: '100%'
    }

    return (
        <section className='treeList' style={style}>
            <ListLoader source={source}
                        filter={thisFilter}
                        navigation={navigation}
                        items={items}
                        dataLoadCallback={dataLoadCallback}
                        showScrollBar={showScrollBar}
                        showShadow={showShadow}
                        showUpBtn={showUpBtn}>
                    {ListWrapper}
            </ListLoader>
        </section>
    );
}