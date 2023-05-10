import {useState} from 'react';
import {List} from 'list';
import {default as SelectorItemTemplate} from 'SelectorList/SelectorItemTemplate';
import {ISelectorList, ISelectedItem} from 'SelectorList/ISelectorList';
import {IItemTemplate} from 'list';

function SelectorList(props: ISelectorList) {
    const [selectedKeys, setSelectedKeys] = useState(props.selectedKeys);

    /**
     * Обертка над ItemTemplate списка
     */
    const ItemTemplateWrapper = (itemTemplateProps: IItemTemplate) => {
        return <SelectorItemTemplate { 
                ...{
                    ...itemTemplateProps,
                    ...{
                        itemTemplate: props.itemTemplate,
                        multiSelect: props.multiSelect,
                        checked: selectedKeys.includes(itemTemplateProps.item[itemTemplateProps.idProperty]),
                        selectedCallback
                    } 
                }
            } />;
    }

    /**
     * Коллбек при выборе записи списка
     * @param ISelectedItem
     */
    const selectedCallback = ({key, checked}: ISelectedItem) => {
        let newSelectedKeys;
        if (props.multiSelect) {
            newSelectedKeys = [...selectedKeys];
            if (checked) {
                newSelectedKeys.push(key);
            } else {
                newSelectedKeys = newSelectedKeys.filter((keySelected) => keySelected !== key);
            }
        } else {
            newSelectedKeys = [key];
        }
        setSelectedKeys(newSelectedKeys);
        props.selectedKeysChanged && props.selectedKeysChanged(newSelectedKeys);
    }

    return <List { ...{...props, itemTemplate: ItemTemplateWrapper} }/>;
}

SelectorList.defaultProps = {
    multiSelect: true,
    selectedKeys: []
};

export default SelectorList;