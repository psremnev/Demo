import { useState } from 'react';
import 'CheckBox/CheckBox.scss';

export default function CheckBox({
  className = '',
  size = 10,
  checked = false,
  checkedCallback,
}) {
  const [isChecked, setIsChecked] = useState(checked);

  /**
   * Стиль чекбокса
   */
  const style = {
    height: size,
    width: size,
  };

  /**
   * Клик по чекбоксу
   */
  const onChecked = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    checkedCallback && checkedCallback(newChecked);
  };

  return (
    <div style={style} className={`checkBox ${className}`} onClick={onChecked}>
      <div className={`checkBox__${isChecked ? '' : 'un'}checked`}></div>
    </div>
  );
}
