import { ORIENTATION_TYPE, DIRECTION } from 'ScrollContainer/constants';
import { ReactNode } from 'react';

export type ORIENTATION =
  (typeof ORIENTATION_TYPE)[keyof typeof ORIENTATION_TYPE];

export interface IScrollContainer {
  className?: string;
  scrollStartCallback?: Function;
  scrollEndCallback?: Function;
  orientation?: ORIENTATION;
  children?: ReactNode;
  showUpBtn?: boolean;
  showScrollBar?: boolean;
  showShadow?: boolean;
  showNavBtns?: boolean;
  direction?: IDirectionValue;
}

export type Direction = typeof DIRECTION;
export type IDirectionValue = Direction[keyof Direction];
