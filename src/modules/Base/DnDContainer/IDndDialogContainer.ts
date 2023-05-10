import { VFC, CSSProperties } from 'react';

export interface IDndDialogContainer {
  canDrag?: boolean;
  children?: VFC;
  style?: CSSProperties;
}
