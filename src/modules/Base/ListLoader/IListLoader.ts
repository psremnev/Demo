import {VFC} from 'react';
import {IScrollContainer} from 'scrollContainer';
import {DIRECTION} from 'ListLoader/constants';

export interface IListLoader extends IScrollContainer {
    source?;
    items?: object[];
    filter?: IFilter;
    navigation?: INavigation,
    children?: VFC;
    dataLoadCallback?: Function;
}

export interface INavigation {
    // размер страницы
    limit?: number;
}

export interface IFilter {
    [key: string]: string|number|boolean
}

export type IDirection = typeof DIRECTION;
export type IDirectionValue = IDirection[keyof IDirection]