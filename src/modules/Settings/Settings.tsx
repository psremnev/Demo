import {DropdownButton} from 'dropdownButton';
import {ISettingsOptions} from 'Settings/ISettings';
/**
 * @link Settings/Settings
 * @description Блок настроек
 */
export default function Settings({className='', items = []}: ISettingsOptions) {
    return (
        <section className={`settings flexbox ${className}`}>
            { items.map((item, index) =>
                <div key={index} className='settings-item marginRight-s'>
                    <DropdownButton title={item.title}
                                    backgroundColor='var(--second_color)'
                                    items={item.items}
                                    multiSelect={false}
                                    selectedKeys={[item.selectedKey]}
                                    selectedKeysChanged={item.callback}
                    />
                </div>)
            }
        </section>
    );
}