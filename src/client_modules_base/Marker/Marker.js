import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @class Marker
 * @description Маркер
 */
export default function Marker({ checked }) {
    const style = {
        borderRadius: '50%',
        height: 10,
        width: 10,
    };
    return (_jsx("div", { style: checked ? Object.assign(Object.assign({}, style), { background: 'var(--mark_color)' }) : style }));
}
