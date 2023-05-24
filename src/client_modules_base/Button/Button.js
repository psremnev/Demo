import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BUTTONS_TYPE } from 'Button/constants';
import 'Button/Button.scss';
/**
 * @link Button/Button
 * @description Кнопка
 */
export default function Button({ type = BUTTONS_TYPE.BASE, icon = '', imageUrl = '', imageSize = 20, backgroundColor = 'var(--default_background_color)', accentColor = 'var(--dark_grey)', mixBlendMode = 'unset', title = '', onClick, }) {
    const isOnlyIcon = !title;
    const hasIcon = icon && (type === BUTTONS_TYPE.BASE || type === BUTTONS_TYPE.ICON);
    const hasImage = imageUrl && type === BUTTONS_TYPE.IMAGE;
    const style = {
        general: {
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            filter: 'brightness(1)',
            cursor: 'pointer',
            mixBlendMode,
        },
        base: {
            padding: isOnlyIcon ? 0 : 6,
            borderRadius: 12,
            boxShadow: isOnlyIcon ? 'none' : `${accentColor} 0px 0px 4px`,
            margin: isOnlyIcon ? 0 : '4px',
            background: imageUrl
                ? 'var(--transparent_background_color)'
                : backgroundColor,
        },
        link: {
            color: 'var(--link_color)',
            textDecoration: 'underline',
        },
        icon: {
            borderRadius: '50%',
            border: '1px solid var(--dark_grey)',
            width: 20,
            height: 20,
            justifyContent: 'center',
            background: backgroundColor,
        },
        image: {
            width: imageSize,
            height: imageSize,
        },
    };
    const titleStyle = type === BUTTONS_TYPE.LINK
        ? {
            color: 'var(--link_color)',
        }
        : {};
    const titleMarginStyle = { marginRight: title ? 6 : 0, padding: 4 };
    return (_jsxs("div", Object.assign({ className: `btn type-${type}`, style: Object.assign(Object.assign({}, style.general), style[type]), onClick: () => onClick && onClick() }, { children: [hasImage && _jsx("img", { src: imageUrl }), hasIcon && _jsx("div", { style: titleMarginStyle, className: icon }), title && _jsx("span", Object.assign({ style: titleStyle }, { children: title }))] })));
}
