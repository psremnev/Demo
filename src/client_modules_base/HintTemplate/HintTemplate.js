import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ORIENTATION, IMAGE_POSITION } from 'HintTemplate/constants';
import { useMemo } from 'react';
import 'HintTemplate/HintTemplate.scss';
/**
 * @class HintTemplate
 * @description Компонент заглушка
 */
export default function HintTemplate({ orientation = ORIENTATION.VERTICAL, imageSrc, imageSize = 40, imagePosition = IMAGE_POSITION.START, title, additionalText }) {
    /**
     * Основной стиль
     */
    const style = useMemo(() => {
        const flexDirection = orientation === ORIENTATION.VERTICAL ? 'column' : 'row';
        return {
            display: 'flex',
            flexDirection: imagePosition === IMAGE_POSITION.START ? flexDirection : `${flexDirection}-reverse`,
            alignItems: 'center'
        };
    }, [orientation, imagePosition]);
    /**
     * Стиль текста
     */
    const styleText = useMemo(() => {
        return {
            display: 'flex',
            flexDirection: orientation === ORIENTATION.VERTICAL ? 'column' : 'row',
            alignItems: 'center'
        };
    }, [orientation]);
    return (_jsxs("div", Object.assign({ style: style, className: 'hintTemplate' }, { children: [imageSrc && _jsx("img", { className: `hintTemplate__image ${orientation === ORIENTATION.HORIZONTAL ? 'marginRight-s' : ''}`, style: { height: imageSize }, src: imageSrc }), _jsxs("section", Object.assign({ style: styleText, className: `hintTemplate__textBlock ${orientation === ORIENTATION.HORIZONTAL ? 'marginRight-s' : ''}` }, { children: [_jsx("span", Object.assign({ className: 'hintTemplate__title marginRight-s' }, { children: title })), additionalText && _jsx("span", Object.assign({ className: 'hintTemplate__additionalText' }, { children: additionalText }))] }))] })));
}
