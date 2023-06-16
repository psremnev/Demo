import { ReactNode, CSSProperties } from 'react';

export interface IDndDialogContainer {
  canDrag?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}
