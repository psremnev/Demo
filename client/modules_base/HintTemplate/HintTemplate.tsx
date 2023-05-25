import {IHintTemplate} from 'HintTemplate/IHintTemplate';
import {ORIENTATION, IMAGE_POSITION} from 'HintTemplate/constants';
import {useMemo} from 'react';
import 'HintTemplate/HintTemplate.scss';

/**
 * @class HintTemplate
 * @description Компонент заглушка
 */

export default function HintTemplate({
    orientation = ORIENTATION.VERTICAL,
    imageSrc,
    imageSize = 40,
    imagePosition = IMAGE_POSITION.START,
    title,
    additionalText
}: IHintTemplate) {

    /**
     * Основной стиль
     */
    const style = useMemo(() => {
        const flexDirection = orientation === ORIENTATION.VERTICAL ? 'column' : 'row';
        return {
            display: 'flex',
            flexDirection: imagePosition === IMAGE_POSITION.START ? flexDirection : `${flexDirection}-reverse`,
            alignItems: 'center'
        }
    }, [orientation, imagePosition])

    /**
     * Стиль текста
     */
    const styleText = useMemo(() => {
        return {
            display: 'flex',
            flexDirection: orientation === ORIENTATION.VERTICAL ? 'column' : 'row',
            alignItems: 'center'
        }
    }, [orientation])

    return (
        <div style={ style } className='hintTemplate'>
            { imageSrc && <img className={`hintTemplate__image ${orientation === ORIENTATION.HORIZONTAL ? 'marginRight-s' : ''}`}
                              style={ {height: imageSize} }
                              src={imageSrc} />
            }
            <section style={ styleText } className={`hintTemplate__textBlock ${orientation === ORIENTATION.HORIZONTAL ? 'marginRight-s' : ''}`}>
                <span className='hintTemplate__title marginRight-s'>{title}</span>
                { additionalText && <span className='hintTemplate__additionalText'>{additionalText}</span>}
            </section>
        </div>
    );
}