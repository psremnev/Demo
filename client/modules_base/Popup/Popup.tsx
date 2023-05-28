import ReactDOM from 'react-dom/client';
import { IPopup } from 'Popup/IPopup';
import { DEFAULT_OPTIONS } from 'Popup/constants';
import { default as Element } from 'Popup/Element';
import 'Popup/Popup.scss';

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
      !(e.target as HTMLElement).className.includes('popup')
    ) {
      this.close();
    }
  };

  open(options: IPopup): void {
    this.options = options;
    if (this.popupIsOpened) {
      this.close();
    }
    const rootEl = document.createElement('div');
    rootEl.className = 'popup';
    this.popupElLink = document.body.appendChild(rootEl);
    const reactRootEl = ReactDOM.createRoot(rootEl);
    const popupOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
      closeCallback: this.close.bind(this),
      onOutsideClickCallback: this.onOutsideClick.bind(this),
      popupIsOpened: this.popupIsOpened,
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
