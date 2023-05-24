import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckBox } from 'checkbox';
import { Marker } from 'marker';
import 'SelectorList/SelectorItemTemplate.scss';
export default function ItemTemplate({ item, idProperty, displayProperty, checked = false, multiSelect = false, itemTemplate, selectedCallback, }) {
    const ItemTemplate = itemTemplate;
    const onSelected = (checked) => {
        selectedCallback && selectedCallback({ key: item[idProperty], checked });
    };
    return (_jsxs("div", Object.assign({ className: "selectorList__ItemTemplate" }, { children: [_jsx("div", Object.assign({ className: "selectorList__ItemTemplateMarkWrapper" }, { children: multiSelect ? (_jsx(CheckBox, { className: "selectorList__ItemTemplateCheckBox", checked: checked, checkedCallback: onSelected })) : (_jsx(Marker, { checked: checked })) })), _jsx("div", Object.assign({ className: "selectorList__ItemTemplateTitle", onClick: () => onSelected(!checked) }, { children: ItemTemplate ? (_jsx(ItemTemplate, { item: item })) : (_jsx("span", { children: item[displayProperty] })) }))] })));
}
