import {FileLoaderType} from 'FileLoader/constants';
import type {TId} from 'list';

export interface IFileLoader {
    type?: typeof FileLoaderType[keyof typeof FileLoaderType];
    loadCallback?: (IFileResult) => void;
    progressCallback?: (IFileResult) => void;
    multiSelect?: boolean;
}

export interface IFileResult {
    id: TId;
    name: string;
    ext: string;
    type: string;
    createDate: Date;
    size: number;
    progress: string;
    data: string|ReadableStream;
    error: string;
}