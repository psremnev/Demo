export const POPUP_TYPE = {
    DIALOG: 'dialog',
    STACK: 'stack',
};
export const DEFAULT_OPTIONS = {
    type: POPUP_TYPE.DIALOG,
    title: '',
    content: null,
    width: 'auto',
    canDrag: true,
};
export const DEFAULT_TARGET_OFFSET = {
    top: 0,
    left: 0,
};
export const CONFIRMATION_TYPE = {
    OK: 'ok',
    YES_NO: 'yesno',
    YES_NO_CANCEL: 'yesnocancel',
};
const CONFIRMATION_YES_NO_TITLES = [
    { title: 'Да', result: true, accentColor: 'var(--success_color)' },
    { title: 'Нет', result: false, accentColor: 'var(--danger_color)' },
];
export const CONFIRMATION_TITLES = {
    [CONFIRMATION_TYPE.OK]: [
        { title: 'OK', result: false, accentColor: 'var(--success_color)' },
    ],
    [CONFIRMATION_TYPE.YES_NO]: CONFIRMATION_YES_NO_TITLES,
    [CONFIRMATION_TYPE.YES_NO_CANCEL]: [
        ...CONFIRMATION_YES_NO_TITLES,
        { title: 'Отмена', result: false, accentColor: 'var(--danger_color)' },
    ],
};
