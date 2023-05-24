import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import 'ToggleButton/ToggleButton.scss';
/**
 * @link ToggleButton/ToggleButton
 * @description Кнопка переключения
 */
export default function ToggleButton({ clickCallback }) {
    const [state, setState] = useState(false);
    const onClick = () => {
        const newState = !state;
        setState(newState);
        clickCallback && clickCallback();
    };
    return (_jsx("section", Object.assign({ className: "toggleButton", style: { background: state ? '#d7dbef' : 'transparent' }, onClick: onClick }, { children: _jsx("div", { className: `toggleButton__circle ${state
                ? 'toggleButton__circle_forward'
                : ''}` }) })));
}
