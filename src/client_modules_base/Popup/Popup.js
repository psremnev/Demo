import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import { DEFAULT_OPTIONS } from 'Popup/constants';
import { default as Element } from 'Popup/Element';
import 'Popup/Popup.scss';
/**
 * @class Popup/Popup
 * @description Всплывающее окно диалога или стек панели с произвольным контентом
 */
export default class Popup {
    constructor() {
        this.popupElLink = null;
        this.popupIsOpened = false;
        this.onOutsideClick = (e) => {
            if (this.options.closeOnOutsideClick &&
                this.popupIsOpened &&
                !e.target.className.includes('popup')) {
                this.close();
            }
        };
    }
    open(options) {
        this.options = options;
        if (this.popupIsOpened) {
            this.close();
        }
        const rootEl = document.createElement('div');
        rootEl.className = 'popup';
        this.popupElLink = document.body.appendChild(rootEl);
        const reactRootEl = ReactDOM.createRoot(rootEl);
        const popupOptions = Object.assign(Object.assign(Object.assign({}, DEFAULT_OPTIONS), options), { closeCallback: this.close.bind(this), onOutsideClickCallback: this.onOutsideClick.bind(this), popupIsOpened: this.popupIsOpened });
        reactRootEl.render(_jsx(Element, Object.assign({}, popupOptions)));
    }
    close() {
        var _a;
        document.documentElement.removeEventListener('click', this.onOutsideClick);
        (_a = this.popupElLink) === null || _a === void 0 ? void 0 : _a.remove();
        this.popupElLink = null;
        this.popupIsOpened = false;
    }
    isOpened() {
        return this.popupIsOpened;
    }
}
