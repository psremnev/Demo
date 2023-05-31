import { ReactNode } from 'react';
import { IScrollContainer } from 'scrollContainer';
import { DIRECTION } from 'ListLoader/constants';
import type { Collection } from 'Collection/Collection';

export interface IListLoader extends IScrollContainer {
  source?;
  idProperty: string;
  items?: object[];
  filter?: IFilter;
  navigation?: INavigation;
  children?: ReactNode;
  dataLoadCallback?: Function;
}

export interface INavigation {
  // размер страницы
  limit?: number;
}

export interface IFilter {
  [key: string]: string | number | boolean;
}

export type IDirection = typeof DIRECTION;
export type IDirectionValue = IDirection[keyof IDirection];
