import { IDndDialogContainer } from 'DnDContainer/IDndDialogContainer';
import { useState } from 'react';

/**
 * @link DnDContainer/DndDialogContainer
 * @description Контейнер обертка для перетаскивания элементов внутри окна браузера.
 *  Для корректной работы элемент должен находится внутри document.documentElement
 */

export default function DndDialogContainer({
  canDrag = true,
  children,
  style = {}
}: IDndDialogContainer) {
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
  const onPointerDown = async (e: DragEvent) => {
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
  };

  /**
   * Получить смещение
   * @param e
   */
  const getOffset = (e: DragEvent) => {
    const rect = container.getBoundingClientRect();
    const xCursorOffset = e.pageX - rect.x;
    const yCursorOffset = e.pageY - rect.y;
    // для попап по центру
    const hasCenterTransform =
      container.style.transform === 'translate(-50%, -50%)';
    const halfWidth = hasCenterTransform ? rect.width / 2 : 0;
    const halfHeight = hasCenterTransform ? rect.height / 2 : 0;
    return { x: xCursorOffset - halfWidth, y: yCursorOffset - halfHeight };
  };

  /**
   * Перемещение
   * @param e
   */
  const onPointerMove = (e: DragEvent) => {
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

  return (
    <section
      className="dndDialogContainer"
      style={style}
      ref={setContainer}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {children}
    </section>
  );
}
