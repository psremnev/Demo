import { useState, useEffect, useRef, useMemo } from 'react';
import { Loader } from 'loader';
import { ScrollContainer } from 'scrollContainer';
import { IListLoader } from 'ListLoader/IListLoader';
import { DIRECTION, DEFAULT_NAVIGATION } from 'ListLoader/constants';
import { ORIENTATION_TYPE } from 'ScrollContainer/constants';
import { useComponentDidMount } from 'App/effects/isMounted';
import { Collection } from 'Collection/Collection';
/**
 * @link ListLoader/ListLoader
 * @description Обертка ListLoader для списка для загрузки данных списка
 */
export default function ListLoader({
  source,
  items,
  filter,
  idProperty,
  navigation,
  children,
  dataLoadCallback,
  scrollEndCallback,
  scrollStartCallback,
  orientation = ORIENTATION_TYPE.VERTICAL,
  showUpBtn,
  showScrollBar,
  showShadow,
  showNavBtns
}: IListLoader) {
  const [isDataLoad, setIsDataLoad] = useState(false);
  const [collection, setCollection] = useState(
    new Collection(items || [], idProperty)
  );
  const [thisItems, setThisItems] = useState(collection.getItems());
  const collectionSubscribeId = useRef(null);
  const List = children;
  const isMounted = useComponentDidMount();
  const canLoadData = useMemo(() => {
    return !isDataLoad && source;
  }, [isDataLoad]);
  const loadDirection = useRef(DIRECTION.END);

  /**
   * Загрузка данных
   */
  const loadData = async (direction = DIRECTION.END, reload = false) => {
    direction === DIRECTION.START
      ? scrollStartCallback && scrollStartCallback()
      : scrollEndCallback && scrollEndCallback();
    if (source) {
      try {
        setIsDataLoad(true);
        const nav = { ...DEFAULT_NAVIGATION, ...navigation, direction };
        const loadItems = await source.query(filter || {}, nav);
        const oldItems = collection.getItems();
        if (reload) {
          collection.setItems(loadItems);
        } else if (direction === DIRECTION.END) {
          collection.setItems([...oldItems, ...loadItems]);
        } else {
          collection.setItems([...loadItems, ...oldItems]);
        }
        dataLoadCallback && dataLoadCallback(collection);
      } catch (e) {
        console.error(e);
      } finally {
        setIsDataLoad(false);
      }
    }
  };

  /**
   * Перезагрузка списка, сброс коллекции
   */
  const resetData = () => {
    loadData(DIRECTION.END, true);
  };

  /**
   * Коллбек на изменение коллекции
   */
  const collectionChange = (newItems) => {
    setThisItems(newItems);
  };

  /**
   * Подписка на изменение коллекции
   */
  useEffect(() => {
    collectionSubscribeId.current = collection.subscribeCollectionChange(collectionChange);
    return () =>
      collection.unsubscribeCollectionChange(collectionSubscribeId.current);
  }, [collection]);

  /**
   * Перезагрузка списка при изменении опций source, filter, navigation
   */
  useEffect(() => {
    if (canLoadData && isMounted) {
      // перезагружаем список
      resetData();
    }
  }, [source, filter, navigation]);

  /**
   * Перезагрузка списка при изменении опций source, filter, navigation
   */
  useEffect(() => {
    if (canLoadData && isMounted) {
      // перезагружаем список
      resetData();
    }
  }, [source, filter, navigation]);

  /**
   * Нужно ли догрузить данные если размер контенера больше чем размер элементов в нем
   */
  const needLoadData = (container: HTMLElement) => {
    if (container) {
      let childrenSize = 0;
      const isVerticalOrientation = orientation === ORIENTATION_TYPE.VERTICAL;
      const itemsElements = container.querySelectorAll('.itemTemplate');
      Array.from(itemsElements).forEach((el) => {
        if (isVerticalOrientation) {
          childrenSize += el.clientHeight;
        } else {
          childrenSize += el.clientWidth;
        }
      });
      return isVerticalOrientation
        ? childrenSize < container.clientHeight
        : childrenSize < container.clientWidth;
    }
  };

  /**
   * Инициализируем контейнер и связанные с ним состояния
   * @param container
   */
  const setContainer = (container: HTMLElement) => {
    if (container) {
      if (canLoadData && needLoadData(container)) {
        // догружаем записи если размер элементов меньше размера скролконтейнера
        loadData(DIRECTION.END);
      }
    }
  };

  return (
    <section
      ref={setContainer}
      className="listLoader"
      style={{ width: '100%', height: '100%' }}
    >
      <ScrollContainer
        scrollStartCallback={() => loadData(DIRECTION.START)}
        scrollEndCallback={() => loadData()}
        orientation={orientation}
        showUpBtn={showUpBtn}
        showScrollBar={showScrollBar}
        showShadow={showShadow}
        showNavBtns={showNavBtns}
      >
        {isDataLoad && loadDirection.current === DIRECTION.START && <Loader />}
        <List items={thisItems} />
        {isDataLoad && loadDirection.current === DIRECTION.END && <Loader />}
      </ScrollContainer>
    </section>
  );
}
