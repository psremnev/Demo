import { ITreeListOptions } from './ITreeListOptions';
import { ITreeListItem } from './ITreeListItem';

export interface ITreeItemTemplateOptions extends ITreeListOptions {
  item: ITreeListItem;
  expandedItems: string | number[];
}
