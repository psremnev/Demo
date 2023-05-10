import eng from 'lang/eng.json';
import {LANG} from 'types';
import {getAppContext} from 'utils/getAppContext';

export function translate(value: string) {
    const {lang} = getAppContext();
    return lang === LANG.RU ? value : eng[value];
}