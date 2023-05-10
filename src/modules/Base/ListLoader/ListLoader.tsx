import {useState, useEffect, useRef, useMemo} from 'react';
import {Loader} from 'loader';
import {ScrollContainer} from 'scrollContainer';
import {IListLoader} from 'ListLoader/IListLoader';
import {DIRECTION, DEFAULT_NAVIGATION} from 'ListLoader/constants';
import {ORIENTATION_TYPE} from 'ScrollContainer/constants';
import {useComponentDidMount} from 'effects/isMounted';

/**
 * @link ListLoader/ListLoader
 * @description Обертка ListLoader для списка для загрузки данных списка
 */
export default function ListLoader({
    source,
    items,
    filter,
    navigation,
    children,
    dataLoadCallback,
    scrollEndCallback,
    scrollStartCallback,
    orientation=ORIENTATION_TYPE.VERTICAL,
    showUpBtn,
    showScrollBar,
    showShadow,
    showNavBtns
}: IListLoader) {
    const [isDataLoad, setIsDataLoad] = useState(false);
    const [thisItems, setThisItems] = useState(items || []);
    const List = children;
    const isMounted = useComponentDidMount();
    const canLoadData = useMemo(() => {
        return !isDataLoad && source;
    }, [isDataLoad]);
    const loadDirection = useRef(DIRECTION.END);

    /**
     * Загрузка данных
     */
    const loadData = async(direction = DIRECTION.END, reload = false) => {
        direction === DIRECTION.START ? scrollStartCallback && scrollStartCallback() : scrollEndCallback && scrollEndCallback();
        if (source) {
            try {
                setIsDataLoad(true);
                let newItems;
                const nav = {...DEFAULT_NAVIGATION, ...navigation, direction};
                const loadItems = await source.query(filter || {}, nav);
                if (reload) {
                    newItems = loadItems;
                } else if (direction === DIRECTION.END) {
                    newItems = [...thisItems, ...loadItems];
                } else {
                    newItems = [...loadItems, ...thisItems];
                }
                setThisItems(newItems);
                dataLoadCallback && dataLoadCallback(newItems);
            } catch (e) {
                console.error(e);
            } finally {
                setIsDataLoad(false)
            }
        }
    }

    /**
     * Перезагрузка списка при изменении опций source, filter, navigation
     */
    useEffect(() => {
        if (canLoadData && isMounted) {
            // перезагружаем список
            loadData(DIRECTION.END, true);
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
            return isVerticalOrientation ? childrenSize < container.clientHeight : childrenSize < container.clientWidth;
        }
    }

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
    }

    return (
        <section ref={setContainer} className='listLoader' style={ {width: '100%', height: '100%'} }>
            <ScrollContainer scrollStartCallback={() => loadData(DIRECTION.START)}
                             scrollEndCallback={() => loadData()}
                             orientation={orientation}
                             showUpBtn={showUpBtn}
                             showScrollBar={showScrollBar}
                             showShadow={showShadow}
                             showNavBtns={showNavBtns}>
                { isDataLoad && loadDirection === DIRECTION.START && <Loader />}
                <List items={thisItems}/>
                { isDataLoad && loadDirection === DIRECTION.END && <Loader /> }
            </ScrollContainer>
        </section>
    );
}