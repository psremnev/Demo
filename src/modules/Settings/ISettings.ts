import {IButton} from 'button';
export interface ISettingsItem {
  title: string;
  selectedKey: string | number;
  items: {
    id?: string;
    title?: string;
  }[];
  callback: Function;
}

export interface ISettingsOptions extends IButton{
  className?: string;
  items: ISettingsItem[];
}