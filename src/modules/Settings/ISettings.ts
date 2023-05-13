export interface ISettingsItem {
  title: string;
  selectedKey: string | number;
  items: {
    id?: string;
    title?: string;
  }[];
  callback: Function;
}

export interface ISettingsOptions {
    className?: string;
    items: ISettingsItem[];
}