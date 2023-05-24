import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @link Header/Header
 * @description Заголовок
 */
export default function Header({ title, size = 20, color = 'var(--default_color)' }) {
    return (_jsx("span", Object.assign({ style: {
            fontSize: size,
            color,
            fontFamily: 'monospace',
            fontWeight: 'bold'
        } }, { children: title })));
}
