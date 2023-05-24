import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { POPUP_TYPE, DEFAULT_TARGET_OFFSET, CONFIRMATION_TITLES, } from 'Popup/constants';
import { Button, BUTTONS_TYPE } from 'button';
import { useEffect, useState } from 'react';
import { DnDDialogContainer } from 'dndContainer';
import { useComponentDidMount } from 'App/effects/isMounted';
import 'Popup/Popup.scss';
const getStyle = (width, target, targetOffset, type) => {
    const { left, top } = getDialogCoor(target, targetOffset);
    const style = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        background: '#ffffff',
        width,
        padding: 6,
        zIndex: 10
    };
    const dialogStyle = {
        top,
        left,
        transform: target ? 'none' : 'translate(-50%, -50%)',
        borderRadius: 6,
        boxShadow: '0px 0px 11px #626060',
    };
    const stackStyle = {
        top: 0,
        right: 0,
        height: '100%',
        borderLeft: '3px solid #eaeaea',
        boxSizing: 'border-box',
    };
    return type === POPUP_TYPE.DIALOG
        ? Object.assign(Object.assign({}, style), dialogStyle) : Object.assign(Object.assign({}, style), stackStyle);
};
const getDialogCoor = (target, targetOffset) => {
    const targetCoor = target === null || target === void 0 ? void 0 : target.getBoundingClientRect();
    return {
        top: (targetCoor === null || targetCoor === void 0 ? void 0 : targetCoor.top)
            ? targetCoor.top + ((targetOffset === null || targetOffset === void 0 ? void 0 : targetOffset.top) || DEFAULT_TARGET_OFFSET.top)
            : '50%',
        left: (targetCoor === null || targetCoor === void 0 ? void 0 : targetCoor.left)
            ? targetCoor.left + ((targetOffset === null || targetOffset === void 0 ? void 0 : targetOffset.left) || DEFAULT_TARGET_OFFSET.left)
            : '50%',
    };
};
export default function Element({ type, title, width, content, target, targetOffset, closeOnOutsideClick, canDrag, confirmationCfg, closeCallback, onOutsideClickCallback, popupIsOpened, }) {
    const Content = content;
    const [isOpened, setIsOpened] = useState(popupIsOpened);
    const isMounted = useComponentDidMount();
    const confirmationBtnClick = (res) => {
        closeCallback && closeCallback();
        (confirmationCfg === null || confirmationCfg === void 0 ? void 0 : confirmationCfg.callback) && (confirmationCfg === null || confirmationCfg === void 0 ? void 0 : confirmationCfg.callback(res));
    };
    const Footer = () => {
        const titles = CONFIRMATION_TITLES[confirmationCfg === null || confirmationCfg === void 0 ? void 0 : confirmationCfg.type];
        return (_jsx("footer", Object.assign({ className: "popup-footer" }, { children: titles.map((item) => {
                return (_jsx("div", { children: _jsx(Button, { onClick: () => confirmationBtnClick(item.result), accentColor: item.accentColor, title: item.title }) }, item.title));
            }) })));
    };
    useEffect(() => {
        document.documentElement.addEventListener('click', (e) => onOutsideClickCallback(e));
    }, []);
    return (_jsxs(DnDDialogContainer, Object.assign({ style: getStyle(width, target, targetOffset, type), canDrag: canDrag && type !== POPUP_TYPE.STACK }, { children: [title && (_jsxs("header", Object.assign({ className: "popup-header" }, { children: [_jsx("span", Object.assign({ className: "popup-header__title" }, { children: title })), _jsx(Button, { onClick: closeCallback, icon: "ti-close", type: BUTTONS_TYPE.ICON })] }))), _jsx("main", Object.assign({ className: "popup-content" }, { children: Content && _jsx(Content, {}) })), confirmationCfg && _jsx(Footer, {})] })));
}
