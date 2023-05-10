import {CheckBox} from 'checkbox';
import {Marker} from 'marker';
import 'SelectorList/SelectorItemTemplate.scss';

export default function ItemTemplate({
    item,
    idProperty,
    displayProperty,
    checked = false,
    multiSelect = false,
    itemTemplate,
    selectedCallback
}) {
    const ItemTemplate = itemTemplate;

    const onSelected = (checked) => {
        selectedCallback && selectedCallback({key: item[idProperty], checked});
    }

    return (
        <div className='selectorList__ItemTemplate'>
            <div className='selectorList__ItemTemplateMarkWrapper'>
                { multiSelect ? 
                    <CheckBox className='selectorList__ItemTemplateCheckBox' checked={checked} checkedCallback={onSelected}/>
                    :
                    <Marker checked={checked}/>
                }
            </div>
            <div className='selectorList__ItemTemplateTitle' onClick={ () => onSelected(!checked)}>
                { ItemTemplate ? 
                    <ItemTemplate item={item} />
                    :
                    <span>{item[displayProperty]}</span> 
                }
            </div>
        </div>
    );
}