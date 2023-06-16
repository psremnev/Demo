import {
  IDnDListItemContainer,
  IDragElement
} from 'DnDContainer/IDnDListItemContainer';
import { useState, useMemo } from 'react';
import { POSITION } from 'DnDContainer/constants';

/**
 * @link DnDContainer/DnDListItemContainer
 * @description Контейнер обертка для перетаскивания элементов списка
 */

export default function DnDListItemContainer({
  id,
  canDrag = true,
  dragStartCallback,
  dragMoveCallback,
  dragEndCallback,
  children
}: IDnDListItemContainer) {
  const [container, setContainer] = useState(null);
  const containerEl = useMemo(() => container && (container as HTMLElement));

  /**
   * Изменить расположение элемента при перетаскивании
   */
  const insert = (position = POSITION.AFTER) => {
    const dragElement = globalThis.dragElement?.element;
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
    } else if (positionEl.before) {
      positionEl.after(element);
    } else {
      positionEl.parent.append(element);
    }
  };

  /**
   * Установить стиль элемента при перетаскивании
   * @param isDrag {boolean}
   */
  const setDragStyle = (isDrag: boolean) => {
    //container.style.cursor = 'move';
    containerEl.style.filter = `brightness(${isDrag ? 0.5 : 0})`;
  };

  /**
   * Конец перетаскивания
   */
  const onDragStart = async (e: DragEvent) => {
    if (canDrag) {
      e.dataTransfer.effectAllowed = 'move';
      let options;
      if (dragStartCallback) {
        options = await dragStartCallback(id);
      }
      // такое решение так как событие dragEnter не позволяет использовать dataTransfer.getData
      globalThis.dragElement = {
        element: containerEl,
        options,
        positionEl: {
          after: containerEl.previousSibling,
          before: containerEl.nextSibling,
          parent: containerEl.parentElement
        },
        positionResult: { after: null, before: null }
      };
      setDragStyle(true);
    }
  };

  /**
   * События перехода курсора на новый элемент драг н дропа
   * @param e
   */
  const onDragEnter = async (e: DragEvent) => {
    if (canDrag) {
      let canMove;
      const { element, positionResult } = globalThis.dragElement;
      if (dragMoveCallback) {
        canMove = await dragMoveCallback(id);
      }
      // переносим элемент в дом дереве если переносимый элемент не равен тому на который навели курсор и dragMoveCallback не вернул false
      if (canMove !== false && element && container !== element) {
        const dragElementRect = element.getBoundingClientRect();
        // если коор. курсора выше элемента то всталяем элемент после, иначе до
        const isInsertAfter = e.clientY > dragElementRect.y;
        if (isInsertAfter) {
          insert();
          positionResult.after = id;
        } else {
          insert(POSITION.BEFORE);
          positionResult.before = id;
        }
      }
    }
  };

  /**
   * Конец перетаскивания
   */
  const onDragEnd = async () => {
    if (canDrag) {
      const { positionResult } = globalThis.dragElement;
      setDragStyle(false);
      if (dragEndCallback) {
        const moveResult = await dragEndCallback(id, positionResult);
        // если dragEndCallback вернет false(не переместили) то возвращаем елемент в исходную точку
        if (moveResult === false) {
          revert();
        }
      }
    }
  };

  return (
    <section
      ref={setContainer}
      draggable={true}
      className="dndListItemContainer"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
    >
      {children}
    </section>
  );
}
