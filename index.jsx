addEventListener('DOMContentLoaded', (event) => {});
// <!-- Git Hub Site -->
import { render } from 'react-dom';
import Demo from 'client_modules/Demo/Demo';

addEventListener('DOMContentLoaded', () => {
    render(<Demo />, document.querySelector('.root'));
});