import { useState } from 'react';
import { IToggleButton } from 'ToggleButton/IToggleButton';
import 'ToggleButton/ToggleButton.scss';

/**
 * @link ToggleButton/ToggleButton
 * @description Кнопка переключения
 */

export default function ToggleButton({ clickCallback }: IToggleButton) {
  const [state, setState] = useState(false);

  const onClick = () => {
    const newState = !state;
    setState(newState);
    clickCallback && clickCallback();
  };

  return (
    <section
      className="toggleButton"
      style={{ background: state ? '#e0efd7' : '#ffdddd' }}
      onClick={onClick}
    >
      <div
        className={`toggleButton__circle ${
          state ? 'toggleButton__circle_forward' : ''
        }`}
      />
    </section>
  );
}
