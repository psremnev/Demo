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
import { useState } from 'react';
/**
 * @link DnDContainer/DndDialogContainer
 * @description Контейнер обертка для перетаскивания элементов внутри окна браузера.
 *  Для корректной работы элемент должен находится внутри document.documentElement
 */
export default function DndDialogContainer({ canDrag = true, children, style = {}, }) {
    const [isDrag, setIsDrag] = useState(false);
    const [container, setContainer] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    /**
     * Переместить элемент к курсору мыши
     * @param pageX
     * @param pageY
     */
    function moveAt(pageX, pageY, offset) {
        container.style.left = `${pageX - offset.x}px`;
        container.style.top = `${pageY - offset.y}px`;
    }
    /**
     * Начало перемещения
     * @param e
     */
    const onPointerDown = (e) => __awaiter(this, void 0, void 0, function* () {
        if (canDrag) {
            const offset = getOffset(e);
            setIsDrag(true);
            setOffset(offset);
            moveAt(e.pageX, e.pageY, offset);
            container.style.userSelect = 'none';
            // чтобы работало на мобильном устройстве https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event
            container.style.touchAction = 'none';
            container.style.position = 'absolute';
            container.style.zIndex = 1000;
        }
    });
    /**
     * Получить смещение
     * @param e
     */
    const getOffset = (e) => {
        const rect = container.getBoundingClientRect();
        const xCursorOffset = e.pageX - rect.x;
        const yCursorOffset = e.pageY - rect.y;
        // костыль для попап по центру
        const hasCenterTransform = container.style.transform === 'translate(-50%, -50%)';
        const halfWidth = hasCenterTransform ? rect.width / 2 : 0;
        const halfHeight = hasCenterTransform ? rect.height / 2 : 0;
        return { x: xCursorOffset - halfWidth, y: yCursorOffset - halfHeight };
    };
    /**
     * Перемещение
     * @param e
     */
    const onPointerMove = (e) => {
        if (canDrag && isDrag) {
            moveAt(e.pageX, e.pageY, offset);
        }
    };
    /**
     * Конец перемещения
     */
    const onPointerUp = () => {
        if (canDrag) {
            container.style.userSelect = 'auto';
            container.style.touchAction = 'auto';
            setIsDrag(false);
        }
    };
    return (_jsx("section", Object.assign({ className: "dndDialogContainer", style: style, ref: setContainer, onPointerDown: onPointerDown, onPointerMove: onPointerMove, onPointerUp: onPointerUp }, { children: children })));
}
