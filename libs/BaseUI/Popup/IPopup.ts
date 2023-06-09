import { ReactNode } from 'react';
import { POPUP_TYPE, CONFIRMATION_TYPE } from 'Popup/constants';

export interface IPopup {
  type: (typeof POPUP_TYPE)[keyof typeof POPUP_TYPE];
  title?: string;
  width?: number | string;
  content: ReactNode;
  target?: HTMLElement;
  targetOffset?: ITargetOffset;
  closeOnOutsideClick?: boolean;
  canDrag?: boolean;
  confirmationCfg?: IConfirmationCfg;
  modal: boolean;
  eventHandlers?: {
    onResult?: (result) => void
  }
}

interface IConfirmationCfg {
  type: (typeof CONFIRMATION_TYPE)[keyof typeof CONFIRMATION_TYPE];
  callback: Function;
}

interface ITargetOffset {
  top?: number;
  left?: number;
}

export interface IElement extends IPopup {
  closeCallback: Function;
  onOutsideClickCallback: Function;
  popupIsOpened: boolean;
}
