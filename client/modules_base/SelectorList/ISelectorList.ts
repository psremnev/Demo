import { IList, TId } from 'list';

export interface ISelectorList extends IList {
  multiSelect?: boolean;
  selectedKeys?: TSelectedKeys;
  selectedKeysChanged?: Function;
}

export interface ISelectedItem {
  key: TId;
  checked: boolean;
}

export type TSelectedKeys = Array<TId>;
