import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { List } from 'list';
import { default as SelectorItemTemplate } from 'SelectorList/SelectorItemTemplate';
function SelectorList(props) {
    const [selectedKeys, setSelectedKeys] = useState(props.selectedKeys);
    /**
     * Обертка над ItemTemplate списка
     */
    const ItemTemplateWrapper = (itemTemplateProps) => {
        return (_jsx(SelectorItemTemplate, Object.assign({}, Object.assign(Object.assign({}, itemTemplateProps), {
            itemTemplate: props.itemTemplate,
            multiSelect: props.multiSelect,
            checked: selectedKeys.includes(itemTemplateProps.item[itemTemplateProps.idProperty]),
            selectedCallback,
        }))));
    };
    /**
     * Коллбек при выборе записи списка
     * @param ISelectedItem
     */
    const selectedCallback = ({ key, checked }) => {
        let newSelectedKeys;
        if (props.multiSelect) {
            newSelectedKeys = [...selectedKeys];
            if (checked) {
                newSelectedKeys.push(key);
            }
            else {
                newSelectedKeys = newSelectedKeys.filter((keySelected) => keySelected !== key);
            }
        }
        else {
            newSelectedKeys = [key];
        }
        setSelectedKeys(newSelectedKeys);
        props.selectedKeysChanged && props.selectedKeysChanged(newSelectedKeys);
    };
    return _jsx(List, Object.assign({}, Object.assign(Object.assign({}, props), { itemTemplate: ItemTemplateWrapper })));
}
SelectorList.defaultProps = {
    multiSelect: true,
    selectedKeys: [],
};
export default SelectorList;
