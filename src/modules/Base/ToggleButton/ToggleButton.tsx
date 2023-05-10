import { useState } from 'react';
import { IToggleButton } from 'ToggleButton/IToggleButton';

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
      style={{ background: state ? '#d7dbef' : 'transparent' }}
      onClick={onClick}
    >
      <div
        className={`toggleButton__circle ${
          state
            ? 'toggleButton__circle_forward'
            : ''
        }`}
      />
    </section>
  );
}
