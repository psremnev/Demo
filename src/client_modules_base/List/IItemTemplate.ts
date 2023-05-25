import { ReactNode } from 'react';
import { IListItem } from 'src/client_modules_base/List/IListItem';

export interface IItemTemplate {
  item: IListItem;
  idProperty: string;
  displayProperty: string;
  itemTemplate: ReactNode;
}
