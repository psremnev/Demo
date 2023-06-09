import ReactDOM from 'react-dom/client';
import { IPopup } from 'Popup/IPopup';
import { DEFAULT_OPTIONS } from 'Popup/constants';
import { default as Element } from 'Popup/Element';
import 'Popup/Popup.scss';

const modalStyle = `
  width: 100%;
  height: 100%;
  background: #2d2c2c47;
  position: fixed;
  z-index: 2;
  box-sizing: border-box;
`

/**
 * @class Popup/Popup
 * @description Всплывающее окно диалога или стек панели с произвольным контентом
 */
export default class Popup {
  private popupElLink = null;
  private popupIsOpened = false;
  private options: IPopup;

  private onOutsideClick = (e) => {
    if (
      this.options.closeOnOutsideClick &&
      this.popupIsOpened &&
      !(e.target as HTMLElement).className.includes('popup') &&
      !this.isParentPopup(e)
    ) {
      this.close();
    }
  };

  private isParentPopup(e): boolean {
    let isPopup = false;
    let el = e.target.parentNode as HTMLElement;
    while (!!el.parentNode) {
      if (el.className?.includes('popup')) {
        isPopup = true;
        break;
      }
      el = el.parentNode as HTMLElement;
    }
    return isPopup;
  }

  open(options: IPopup): void {
    this.options = options;
    if (this.popupIsOpened) {
      this.close();
    }
    const rootEl = document.createElement('div');
    rootEl.className = 'popup';
    if (options.modal) {
      rootEl.style.cssText = modalStyle;
    }
    this.popupElLink = document.body.appendChild(rootEl);
    const reactRootEl = ReactDOM.createRoot(rootEl);
    const popupOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
      closeCallback: this.close.bind(this),
      onOutsideClickCallback: this.onOutsideClick.bind(this),
      popupIsOpened: this.popupIsOpened
    };
    this.popupIsOpened = true;
    reactRootEl.render(<Element {...popupOptions} />);
  }

  close(): void {
    document.documentElement.removeEventListener('click', this.onOutsideClick);
    this.popupElLink?.remove();
    this.popupElLink = null;
    this.popupIsOpened = false;
  }

  isOpened(): boolean {
    return this.popupIsOpened;
  }
}
