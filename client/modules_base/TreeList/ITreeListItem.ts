import {IListItem} from 'list';

export interface ITreeListItem extends IListItem {
    parent: string|number;
    hasChildren: boolean;
}