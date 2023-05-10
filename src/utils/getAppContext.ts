import AppContext from 'context/app';
import {useContext} from 'react';

export function getAppContext() {
    return useContext(AppContext);
}