import { BUTTONS_TYPE } from 'Button/constants';

export interface IButtonOptions {
  title?: string;
  className?: string;
  type?: (typeof BUTTONS_TYPE)[keyof typeof BUTTONS_TYPE];
  icon?: string; // класс иконки из шрифтов
  imageUrl?: string; // url картинки
  imageSize?: number; // размер картинки
  backgroundColor?: string; // любой css цвет
  accentColor?: string;
  onClick?: Function;
}
