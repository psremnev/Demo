import { BUTTONS_TYPE, KEY_CODE_ENTER } from 'Button/constants';
import { IButton } from 'Button/IButton';
import 'Button/Button.scss';

/**
 * @link Button/Button
 * @description Кнопка
 */
export default function Button({
  readOnly = false,
  type = BUTTONS_TYPE.BASE,
  icon = '',
  imageUrl = '',
  imageSize = 20,
  iconSize = 20,
  backgroundColor = 'var(--default_background_color)',
  accentColor = 'var(--dark_grey)',
  title = '',
  onClick
}: IButton) {
  const isOnlyIcon = !title;
  const hasIcon =
    icon && (type === BUTTONS_TYPE.BASE || type === BUTTONS_TYPE.ICON);
  const hasImage = imageUrl && type === BUTTONS_TYPE.IMAGE;

  const style = {
    general: {
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      filter: 'brightness(1)',
      cursor: 'pointer',
      overflow: 'hidden',
      background: 'inherit',
      outline: 'none',
      border: 'none'
    },
    base: {
      border: '1px solid transparent',
      padding: isOnlyIcon ? 0 : 6,
      borderRadius: 12,
      boxShadow: isOnlyIcon ? 'none' : `${accentColor} 0px 0px 4px`,
      margin: isOnlyIcon ? 0 : '4px', // на ширину тени
      background: imageUrl
        ? 'var(--transparent_background_color)'
        : backgroundColor
    },
    link: {
      border: '1px solid transparent',
      padding: '2px',
      color: 'var(--link_color)',
      textDecoration: 'underline',
      background: backgroundColor
    },
    icon: {
      borderRadius: '50%',
      border: '1px solid var(--dark_grey)',
      width: iconSize,
      height: iconSize,
      justifyContent: 'center',
      background: backgroundColor,
      flexShrink: 0
    },
    image: {
      width: imageSize,
      height: imageSize
    },
    titleStyle:
      type === BUTTONS_TYPE.LINK
        ? {
            color: 'var(--link_color)'
          }
        : {},
    titleMarginStyle: { marginRight: title ? 6 : 0, padding: 4 }
  };

  const onClickEvent = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };

  const onKeyDown = (e) => {
    if (e.keyCode === KEY_CODE_ENTER) {
      onClickEvent(e);
    }
  };

  return (
    <button
      className={`btn btnType-${type} ${readOnly ? 'btn_readOnly' : ''}`}
      disabled={readOnly}
      tabIndex={0}
      style={{ ...style.general, ...style[type] }}
      onClick={onClickEvent}
      onKeyDown={onKeyDown}
    >
      {hasImage && <img src={imageUrl} />}
      {hasIcon && <div style={style.titleMarginStyle} className={icon}></div>}
      {title && (
        <span title={title} style={style.titleStyle}>
          {title}
        </span>
      )}
    </button>
  );
}
