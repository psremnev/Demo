import {IError} from 'error';

export interface IPreloadResult extends IError {
    preloadData?: any;
}