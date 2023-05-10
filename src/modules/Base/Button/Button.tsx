import {BUTTONS_TYPE} from 'Button/constants';
import {IButtonOptions} from 'Button/IButtonOptions';
import 'Button/Button.scss'

/**
 * @link Button/Button
 * @description Кнопка
 */
export default function Button({
    type = BUTTONS_TYPE.BASE,
    icon = '',
    imageUrl = '',
    imageSize = 20,
    backgroundColor = 'var(--default_background_color)',
    accentColor = 'var(--dark_grey)',
    title = '',
    onClick
}: IButtonOptions) {
    const isOnlyIcon = !title;
    const hasIcon = icon && (type === BUTTONS_TYPE.BASE || type === BUTTONS_TYPE.ICON);
    const hasImage = imageUrl && type === BUTTONS_TYPE.IMAGE;

    const style = {
        general: {
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            filter: 'brightness(1)',
            cursor: 'pointer'
        },
        base: {
            padding: isOnlyIcon ? 0 : 6,
            borderRadius: 12,
            boxShadow: isOnlyIcon ? 'none' : `${accentColor} 0px 0px 4px`,
            background: imageUrl ? 'var(--transparent_background_color)' : backgroundColor
        },
        link: {
            color: 'var(--link_color)',
            textDecoration: 'underline'
        },
        icon: {
            borderRadius: '50%',
            border: '1px solid var(--dark_grey)',
            width: 20,
            height: 20,
            justifyContent: 'center',
            background: backgroundColor
        },
        image: {
            width: imageSize,
            height: imageSize
        }
    }

    const titleMArginStyle = {marginRight: title ? 6 : 0, padding: 4};

    return (
        <div className={`btn type-${type}`}
             style={ {...style.general, ...style[type]} }
             onClick={() => onClick && onClick()}>
            {hasImage && <img src={imageUrl} />}
            {hasIcon && <div style={titleMArginStyle} className={icon}></div>}
            {title && <div>{title}</div>}
        </div>
    );
}