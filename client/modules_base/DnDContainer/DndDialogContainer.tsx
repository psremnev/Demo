import { IDndDialogContainer } from 'DnDContainer/IDndDialogContainer';
import { useEffect, useMemo, useState } from 'react';

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
  const [abortEventController, setAbortEventController] = useState(null);
  const [container, setContainer] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  /**
   * Эффект добавления подписки
   * @param e
   */
  useEffect(() => {
    if (abortEventController) {
      addMoveListener();
    }
  }, [abortEventController]);

  /**
   * Переместить элемент к курсору мыши
   * @param pageX
   * @param pageY
   */
  const moveAt = (pageX, pageY, offset) => {
    container.style.left = `${pageX - offset.x}px`;
    container.style.top = `${pageY - offset.y}px`;
  };

  /**
   * Начало перемещения
   * @param e
   */
  const onPointerDown = (e: PointerEvent) => {
    if (canDrag) {
      const offset = getOffset(e);
      setAbortEventController(new AbortController());
      setOffset(offset);
      moveAt(e.pageX, e.pageY, offset);
      container.style.userSelect = 'none';
      // чтобы работало на мобильном устройстве https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event
      container.style.touchAction = 'none';
    }
  };

  /**
   * Перемещение
   * @param e
   */
  const onPointerMove = (e: PointerEvent) => {
    moveAt(e.pageX, e.pageY, offset);
  };

  /**
   * Получить смещение
   * @param e
   */
  const getOffset = (e: PointerEvent) => {
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
   * Добавить подписку нa document на событие перемещения курсора
   * @param e
   */
  const addMoveListener = () => {
    const { signal } = abortEventController;
    document.addEventListener('pointermove', onPointerMove, { signal });
  };

  /**
   * Конец перемещения
   */
  const onPointerUp = () => {
    if (canDrag) {
      container.style.userSelect = 'auto';
      container.style.touchAction = 'auto';
      abortEventController.abort();
      setAbortEventController(null);
    }
  };

  return (
    <section
      className="dndDialogContainer"
      style={style}
      ref={setContainer}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {children}
    </section>
  );
}
