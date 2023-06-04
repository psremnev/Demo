import { BUTTONS_TYPE } from 'Button/constants';

export interface IButton {
  title?: string;
  className?: string;
  type?: (typeof BUTTONS_TYPE)[keyof typeof BUTTONS_TYPE];
  icon?: string; // класс иконки из шрифтов
  imageUrl?: string; // url картинки
  imageSize?: number; // размер картинки
  iconSize?: number; // размер иконки
  backgroundColor?: string; // любой css цвет
  accentColor?: string;
  mixBlendMode?: string; // css mixBlendMode
  onClick?: Function;
}
