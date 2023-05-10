import {IList} from 'list';

export interface ITreeListOptions extends IList {
    expandedCallback?: Function;
}