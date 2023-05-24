addEventListener('DOMContentLoaded', (event) => {});
// <!-- Git Hub Site -->
import { createRoot } from 'react-dom';
import { createElement } from 'react';
import Demo from 'client_modules/Demo/Demo';

const root = createRoot(document.querySelector('.root'));
root.render(createElement(Demo));
