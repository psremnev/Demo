// <!-- Git Hub Site -->
import { default as Demo } from 'client_modules/Demo/Demo';
import { createRoot } from 'react-dom';

window.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('.root'));
  root.render(<Demo preloadData={ {} }/>, root);
});