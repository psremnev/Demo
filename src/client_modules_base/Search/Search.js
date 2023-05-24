import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { translate } from 'base_utils/translate';
import 'Search/Search.scss';
/**
 * @link Search/Search
 * @description Поиск
 */
export default function Search({ value = '', placeholder = `${translate('Найти')}...`, changeCallback, expandable = false, }) {
    const [thisValue, setThisValue] = useState(value);
    const [expand, setExpand] = useState(false);
    const container = useRef(null);
    const onChange = (e) => {
        const value = e.currentTarget.value;
        changeCallback && changeCallback(value);
        setThisValue(value);
    };
    const changeValue = (value) => {
        changeCallback && changeCallback(value);
        setThisValue(value);
        container.current.value = value;
    };
    return (_jsxs("section", Object.assign({ className: "searchWrapper" }, { children: [expandable && !expand && (_jsx("div", { className: "search__expandBtn_true ti-search", onClick: () => setExpand(true) })), (!expandable || expand) && (_jsxs("section", Object.assign({ className: `search ${expandable ? 'search__expandAnim' : ''}` }, { children: [_jsx("input", { ref: container, className: "search__input", placeholder: placeholder, onChange: onChange }), thisValue && (_jsx("div", Object.assign({ className: "search__clear", onClick: () => changeValue('') }, { children: "\u2715" })))] }))), expandable && expand && (_jsx("div", Object.assign({ className: "search__expandBtn_false", onClick: () => setExpand(false) }, { children: "\u2715" })))] })));
}
