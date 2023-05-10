import {VFC} from 'react';
import type {TId} from 'list';

export interface IDnDListItemContainer {
    // ключ для реакта
    key: TId;
    // ключ записи, соответсвует ключу элемента списка
    id: TId;
    canDrag?: boolean;
    // функция должна вернуть опции для элемента драг н дроп
    dragStartCallback?: (id: TId) => {};
    // функция опциоанльно может вренуть false если не нужно переносить на определенный элемент списка
    dragMoveCallback?: (id: TId) => boolean;
    // функция опциоанльно может вренуть false если не нужно переносить элемент(в случае ошибки или других обстоятельств)
    dragEndCallback?: (id: TId, positionResult: IPositionResult) => boolean;
    children?: VFC;
}

export interface IPositionResult {
    // ид записи
    before: TId;
    after: TId;
}

export interface IPositionElement {
    before: HTMLElement;
    after: HTMLElement;
    parent: HTMLElement;
}

export interface IDragElement {
    element: HTMLElement;
    options: object;
    positionEl: IPositionElement;
    positionResult: IPositionResult
}