export interface ISettingsItem {
    title: string;
    selectedKey: string|number;
    items: [];
    callback: Function
}

export interface ISettingsOptions {
    className?: string;
    items: ISettingsItem[];
}