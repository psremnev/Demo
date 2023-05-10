import {useState, useRef} from 'react';
import {IScrollContainer} from 'ScrollContainer/IScrollContainer';
import {DIRECTION, ORIENTATION_TYPE} from 'ScrollContainer/constants';
import {Button} from 'button';


/**
 * @link ScrollContainer/ScrollContainer
 * @description 
 *  Скроллконтейнер, используется для оборачивания в него других компонентов с целью отслеживания событий скрола
 */
export default function ScrollContainer({
    className = '',
    scrollStartCallback,
    scrollEndCallback,
    children,
    orientation = ORIENTATION_TYPE.VERTICAL,
    showUpBtn = false,
    showScrollBar = true,
    showShadow = true,
    showNavBtns = false,
    direction = DIRECTION.END
}: IScrollContainer) {
    const [container, setContainer] = useState(null);
    const [hasStartShadow, setHasStartShadow] = useState(false);
    const [hasEndShadow, setHasEndShadow] = useState(false);
    const lastScrollPos = useRef(0);

    // Offset от края на котором будут срабатывать коллбеки scrollStartCallback и scrollEndCallback
    const callbackOffset = 20;

    /**
     * Расссчет тени скрола
     * @param container 
     */
    const shadowCalculate = (container) => {
        let hasEndShadowCalc;
        let hasStartShadowCalc
        if (orientation === ORIENTATION_TYPE.VERTICAL) {
            hasEndShadowCalc = container.scrollHeight > container.clientHeight && container.scrollTop < container.scrollHeight;
            hasStartShadowCalc = container.scrollTop > 0;
        } else {
            hasEndShadowCalc = container.scrollWidth > container.clientWidth && container.scrollLeft < container.scrollWidth;
            hasStartShadowCalc = container.scrollLeft > 0;
        }
        
        if (hasEndShadow !== hasEndShadowCalc) {
            setHasEndShadow(hasEndShadowCalc);
        }
        if (hasStartShadow !== hasStartShadowCalc) {
            setHasStartShadow(hasStartShadowCalc);
        }
    }

    /**
     * Расссчет позиции скрола и вызов коллбеков
     * @param container 
     */
    const scrollPositionCalc = (container: HTMLElement) => {
        const isVerticalOrientation = orientation === ORIENTATION_TYPE.VERTICAL;
        const scrollBoth = direction === DIRECTION.BOTH;
        const canScrollEnd = scrollBoth || direction === DIRECTION.END;
        const canScrollStart = scrollBoth || direction === DIRECTION.START;
        const scrollPos = isVerticalOrientation ? container.scrollTop : container.scrollLeft;
        const offsetPos = isVerticalOrientation ? container.scrollHeight - callbackOffset : container.scrollWidth  - callbackOffset;
        const scrollPosToEnd = isVerticalOrientation ? container.scrollTop + container.clientHeight : container.scrollLeft + container.clientWidth;
        const moveDirection = scrollPos > lastScrollPos.current ? DIRECTION.END : DIRECTION.START;
        // обновляем данные по последней позиции скрола
        lastScrollPos.current = scrollPos;
        
        const isScrollToEnd = scrollPosToEnd >= offsetPos;
        const isScrollToStart = scrollPos <= callbackOffset;

        if (isScrollToEnd && moveDirection === DIRECTION.END && canScrollEnd) {
            scrollEndCallback && scrollEndCallback();
        }
        if (isScrollToStart && moveDirection === DIRECTION.START && canScrollStart){
            scrollStartCallback && scrollStartCallback();
            // чтобы была возвможность дальше скролить вверх после подгрузки данных
            container.scrollTop = callbackOffset;
        }
    }

    /**
     * Событие скрола
     */
    const onScroll = () => {
        shadowCalculate(container);
        scrollPositionCalc(container);
    }

    /**
     * Инициализируем контейнер скрола и связанные с ним состояния
     * @param container
     */
    const initContainer = (container: HTMLElement) => {
        if (container) {
            setContainer(container);
            shadowCalculate(container);
        }
    }

    /**
     * Стиль скрола
     */
    const style = {
        wrapper: {
            flexDirection: orientation === ORIENTATION_TYPE.VERTICAL ? 'column' : 'row'
        },
        container: {
            [`overflow${orientation === 'vertical' ? 'Y' : 'X'}`]: 'scroll'
        }
    }

    /**
     * Стиль тени скрола
     */
    const shadowStyle = {
        vertical: {
            top: {
                height: 1,
                width: '100%',
                top: 0,
                boxShadow: '0px 6px 6px #adadad'
            },
            bottom: {
                height: 1,
                position: 'absolute',
                width: '100%',
                bottom: 0,
                boxShadow: '0px -6px 6px #adadad'
            }
        },
        horizontal: {
            left: {
                width: 1,
                height: '100%',
                left: 0,
                boxShadow: '0px 6px 6px #adadad'
            },
            right: {
                width: 1,
                height: '100%',
                right: 0,
                boxShadow: '0px 6px 6px #adadad'
            }
        }
    }

    /**
     * Клик по кнопкам навигации
     * @param next 
     */
    const navBtnsClick = (next = true) => {
        const scrollElementDistance = container.querySelector('.itemTemplate')?.clientWidth || 200;
        const scrollDistance = next ? (container.scrollLeft + scrollElementDistance) : (container.scrollLeft - scrollElementDistance);
        container.scrollTo({
            left: scrollDistance,
            behavior: "smooth"
        }); 
    }

    return (
        <div className={`scrollContainer scrollContainer__base ${className}`}
             style={style.wrapper}>
            {showNavBtns &&
                <div className='scrollContainer__previouslyBtn ti-angle-double-left' onClick={() => navBtnsClick(false)} />
             }
            {hasStartShadow && showShadow &&
                <div className='scrollContainer__startShadow'
                    style={ orientation === ORIENTATION_TYPE.VERTICAL ? shadowStyle.vertical.top : shadowStyle.horizontal.left } /> 
            }
            <div ref={initContainer}
                 className={`scrollContainer__base ${showScrollBar ? '' : 'scrollContainer__hideScrollbar'} ${orientation} ${className}`}style={style.container}
                 onScroll={onScroll}>
                {children}
            </div>
            {hasEndShadow && showShadow &&
                <div className='scrollContainer__endShadow'
                    style={ orientation === ORIENTATION_TYPE.VERTICAL ? shadowStyle.vertical.bottom : shadowStyle.horizontal.right } />
            }
            {showNavBtns &&
                <div className='scrollContainer__nextBtn ti-angle-double-right' onClick={() => navBtnsClick()} />
            } 
            { hasStartShadow && showUpBtn && orientation === ORIENTATION_TYPE.VERTICAL && !showScrollBar && 
                <div style={ {position: 'absolute', bottom: 4, right: 0} }>
                    <Button className='scrollContainer__scrollTopBtn' icon='ti-arrow-up' onClick={ () => container.scrollTop = 0} />
                </div>
            } 
        </div>
    );
}