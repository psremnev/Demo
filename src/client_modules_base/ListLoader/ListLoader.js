var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useMemo } from 'react';
import { Loader } from 'loader';
import { ScrollContainer } from 'scrollContainer';
import { DIRECTION, DEFAULT_NAVIGATION } from 'ListLoader/constants';
import { ORIENTATION_TYPE } from 'ScrollContainer/constants';
import { useComponentDidMount } from 'App/effects/isMounted';
/**
 * @link ListLoader/ListLoader
 * @description Обертка ListLoader для списка для загрузки данных списка
 */
export default function ListLoader({ source, items, filter, navigation, children, dataLoadCallback, scrollEndCallback, scrollStartCallback, orientation = ORIENTATION_TYPE.VERTICAL, showUpBtn, showScrollBar, showShadow, showNavBtns, }) {
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
    const loadData = (direction = DIRECTION.END, reload = false) => __awaiter(this, void 0, void 0, function* () {
        direction === DIRECTION.START
            ? scrollStartCallback && scrollStartCallback()
            : scrollEndCallback && scrollEndCallback();
        if (source) {
            try {
                setIsDataLoad(true);
                let newItems;
                const nav = Object.assign(Object.assign(Object.assign({}, DEFAULT_NAVIGATION), navigation), { direction });
                const loadItems = yield source.query(filter || {}, nav);
                if (reload) {
                    newItems = loadItems;
                }
                else if (direction === DIRECTION.END) {
                    newItems = [...thisItems, ...loadItems];
                }
                else {
                    newItems = [...loadItems, ...thisItems];
                }
                setThisItems(newItems);
                dataLoadCallback && dataLoadCallback(newItems);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setIsDataLoad(false);
            }
        }
    });
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
    const needLoadData = (container) => {
        if (container) {
            let childrenSize = 0;
            const isVerticalOrientation = orientation === ORIENTATION_TYPE.VERTICAL;
            const itemsElements = container.querySelectorAll('.itemTemplate');
            Array.from(itemsElements).forEach((el) => {
                if (isVerticalOrientation) {
                    childrenSize += el.clientHeight;
                }
                else {
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
    const setContainer = (container) => {
        if (container) {
            if (canLoadData && needLoadData(container)) {
                // догружаем записи если размер элементов меньше размера скролконтейнера
                loadData(DIRECTION.END);
            }
        }
    };
    return (_jsx("section", Object.assign({ ref: setContainer, className: "listLoader", style: { width: '100%', height: '100%' } }, { children: _jsxs(ScrollContainer, Object.assign({ scrollStartCallback: () => loadData(DIRECTION.START), scrollEndCallback: () => loadData(), orientation: orientation, showUpBtn: showUpBtn, showScrollBar: showScrollBar, showShadow: showShadow, showNavBtns: showNavBtns }, { children: [isDataLoad && loadDirection.current === DIRECTION.START && _jsx(Loader, {}), _jsx(List, { items: thisItems }), isDataLoad && loadDirection.current === DIRECTION.END && _jsx(Loader, {})] })) })));
}
