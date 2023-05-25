import AppContext from 'App/context/app';
import { useContext } from 'react';

export function getAppContext() {
  return useContext(AppContext);
}
