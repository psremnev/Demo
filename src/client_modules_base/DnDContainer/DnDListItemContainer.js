var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { POSITION } from 'DnDContainer/constants';
/**
 * @link DnDContainer/DnDListItemContainer
 * @description Контейнер обертка для перетаскивания элементов списка
 */
export default function DnDListItemContainer({ id, canDrag = true, dragStartCallback, dragMoveCallback, dragEndCallback, children, }) {
    const [container, setContainer] = useState(null);
    const containerEl = useMemo(() => container && container);
    /**
     * Изменить расположение элемента при перетаскивании
     */
    const insert = (position = POSITION.AFTER) => {
        var _a;
        const dragElement = (_a = globalThis.dragElement) === null || _a === void 0 ? void 0 : _a.element;
        if (dragElement) {
            position === POSITION.AFTER
                ? container.after(dragElement)
                : container.before(dragElement);
        }
    };
    /**
     * Вернуть элемент на исходное место
     */
    const revert = () => {
        const { positionEl, element } = globalThis.dragElement;
        if (positionEl.after) {
            positionEl.before(element);
        }
        else if (positionEl.before) {
            positionEl.after(element);
        }
        else {
            positionEl.parent.append(element);
        }
    };
    /**
     * Установить стиль элемента при перетаскивании
     * @param isDrag {boolean}
     */
    const setDragStyle = (isDrag) => {
        //container.style.cursor = 'move';
        containerEl.style.filter = `brightness(${isDrag ? 0.5 : 0})`;
    };
    /**
     * Конец перетаскивания
     */
    const onDragStart = (e) => __awaiter(this, void 0, void 0, function* () {
        if (canDrag) {
            e.dataTransfer.effectAllowed = 'move';
            let options;
            if (dragStartCallback) {
                options = yield dragStartCallback(id);
            }
            // такое решение так как событие dragEnter не позволяет использовать dataTransfer.getData
            globalThis.dragElement = {
                element: containerEl,
                options,
                positionEl: {
                    after: containerEl.previousSibling,
                    before: containerEl.nextSibling,
                    parent: containerEl.parentElement,
                },
                positionResult: { after: null, before: null },
            };
            setDragStyle(true);
        }
    });
    /**
     * События перехода курсора на новый элемент драг н дропа
     * @param e
     */
    const onDragEnter = (e) => __awaiter(this, void 0, void 0, function* () {
        if (canDrag) {
            let canMove;
            const { element, positionResult } = globalThis.dragElement;
            if (dragMoveCallback) {
                canMove = yield dragMoveCallback(id);
            }
            // переносим элемент в дом дереве если переносимый элемент не равен тому на который навели курсор и dragMoveCallback не вернул false
            if (canMove !== false && element && container !== element) {
                const dragElementRect = element.getBoundingClientRect();
                // если коор. курсора выше элемента то всталяем элемент после, иначе до
                const isInsertAfter = e.clientY > dragElementRect.y;
                if (isInsertAfter) {
                    insert();
                    positionResult.after = id;
                }
                else {
                    insert(POSITION.BEFORE);
                    positionResult.before = id;
                }
            }
        }
    });
    /**
     * Конец перетаскивания
     */
    const onDragEnd = () => __awaiter(this, void 0, void 0, function* () {
        if (canDrag) {
            const { positionResult } = globalThis.dragElement;
            setDragStyle(false);
            if (dragEndCallback) {
                const moveResult = yield dragEndCallback(id, positionResult);
                // если dragEndCallback вернет false(не переместили) то возвращаем елемент в исходную точку
                if (moveResult === false) {
                    revert();
                }
            }
        }
    });
    return (_jsx("section", Object.assign({ ref: setContainer, draggable: true, className: "dndListItemContainer", onDragStart: onDragStart, onDragEnd: onDragEnd, onDragEnter: onDragEnter }, { children: children })));
}
