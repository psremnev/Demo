import { LoadButtonType } from 'LoadButton/constants';
import type { TId } from 'list';

type TLoadButtonType = typeof LoadButtonType;

export interface ILoadButton {
  type?: TLoadButtonType[keyof TLoadButtonType];
  loadCallback?: (IFileResult) => void;
  progressCallback?: (IFileResult) => void;
  extensions?: string[];
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
  data: string | ReadableStream;
  error: string;
}
