import { Button, BUTTONS_TYPE } from 'button';
import { Popup, POPUP_TYPE } from 'popup';
import { SelectorList } from 'selectorList';
import { IDropdownButton } from 'DropdownButton/IDropdownButton';
import { useState, useMemo } from 'react';
import 'DropdownButton/DropdownButton.scss';

/**
 * @link DropdownButton/DropdownButton
 * @description Кнопка с выпадающим списком
 */

export default function DropdownButton({
  title,
  icon,
  backgroundColor,
  accentColor,
  source,
  items,
  selectedKeys = [],
  selectedKeysChanged,
  multiSelect
}: IDropdownButton) {
  const [btnEl, setBtnEl] = useState(null);
  const [thisSelectedKeys, setThisSelectedKeys] = useState(selectedKeys);
  const dialog = useMemo(() => new Popup(), []);

  /**
   * Контент поапа
   */
  const Content = () => {
    return (
      <section className="dropDownBtn__content">
        <SelectorList
          items={items}
          source={source}
          selectedKeys={selectedKeys}
          selectedKeysChanged={thisSelectedKeysChanged}
          multiSelect={multiSelect}
        />
        {multiSelect && (
          <Button
            icon="ti-angle-right"
            className="dropDownBtn__applyBtn"
            onClick={onApplyClick}
          />
        )}
      </section>
    );
  };

  /**
   * Открыть окно выбора записи
   */
  const openPopup = () => {
    dialog.open({
      type: POPUP_TYPE.DIALOG,
      target: btnEl,
      closeOnOutsideClick: true,
      canDrag: false,
      content: Content
    });
  };

  /**
   * Клик по кнопке подтверждения при множественном выборе записей
   */
  const onApplyClick = () => {
    dialog.close();
    selectedKeysChanged && selectedKeysChanged(thisSelectedKeys);
  };

  /**
   * Коллбек выбора записей
   */
  const thisSelectedKeysChanged = (selectedKeys: []) => {
    if (!multiSelect) {
      dialog.close();
      selectedKeysChanged && selectedKeysChanged(selectedKeys);
    }
    setThisSelectedKeys(selectedKeys);
  };

  return (
    <div ref={setBtnEl} className="dropDownBtn">
      <Button
        title={title}
        icon={icon}
        backgroundColor={backgroundColor}
        accentColor={accentColor}
        onClick={openPopup}
      />
    </div>
  );
}
