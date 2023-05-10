import {useState, useMemo} from 'react';
import {BaseList} from 'list';
import Expander from './Expander';
import {ITreeItemTemplateOptions} from './ITreeItemTemplateOptions';
import {Button, BUTTONS_TYPE} from 'button';
import './TreeItemTemplate.scss';

const getItems = (items, currentItem) => {
    return items.filter((item) => item.parent === currentItem.id)
}

const getExpandedByExpandedItems = (expandedItems, currentItem) => {
    return expandedItems.includes(currentItem.id);
}

export default function TreeItemTemplate({
    displayProperty,
    itemTemplate,
    source,
    items = [],
    filter = {},
    item,
    onItemClick,
    expandedCallback,
    expandedItems,
    dataLoadCallback,
    canDrag
}: ITreeItemTemplateOptions) {
    const [thisItems, setThisItems] = useState(getItems(items, item));
    const [showLoadMore, setShowLoadMore] = useState([]);
    const [isExpanded, setIsExpanded] = useState(getExpandedByExpandedItems(expandedItems, item));

    const thisFilter = useMemo(() => {
        return {...filter, parent: item.id};
    }, [filter]);
    const ItemTemplate = itemTemplate;

    const onExpanderClick = async() => {
        const expanded = !isExpanded;
        expandedCallback({id: item.id, expanded});
        expanded && await loadData();
        setIsExpanded(expanded);
    }

    const loadData = async() => {
        try {
            const loadItems = await source.call('Query', thisFilter);
            setShowLoadMore(!!loadItems.length); // тут нужно какую-то мета дату возвращать чтобы скрывать сразу
            setThisItems(loadItems);
            dataLoadCallback(loadItems);
        } catch (e) {
            console.error(e);
        }
    }


    return (
    <section className="treeItemTemplate">
        <div className="treeItemTemplate-header">
            { item.hasChildren && <Expander expanded={isExpanded} onClick={onExpanderClick} /> }
            <div>{ ItemTemplate ? <ItemTemplate item={item} /> : <span>{item[displayProperty]}</span> }</div>
        </div>
        { item.hasChildren && isExpanded ?
            <BaseList items={thisItems}
                      displayProperty={displayProperty}
                      onItemClick={onItemClick}
                      itemsContainerPadding={ {top: 0, left: 0, right: 0, bottom: 0} }
                      canDrag={canDrag}
                      itemTemplate={ (props) => 
                        <TreeItemTemplate { 
                                    ...{
                                        ...props,
                                        displayProperty,
                                        source,
                                        filter,
                                        items,
                                        itemTemplate,
                                        expandedCallback,
                                        expandedItems,
                                        dataLoadCallback
                                    } 
                                }
                            />
                       } 
            />
            :
            null
        }
        { isExpanded && item.hasChildren && showLoadMore && 
            <Button className="treeItemTemplate-load"
                    type={BUTTONS_TYPE.LINK}
                    onClick={loadData}
                    title="More"
                    backgroundColor='var(--transparent_background_color)' />
        }
    </section>
    );
}