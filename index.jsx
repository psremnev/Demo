addEventListener('DOMContentLoaded', (event) => {});
// <!-- Git Hub Site -->
import { render } from 'react-dom';
import Demo from 'src/client_modules/Demo/Demo';

addEventListener('DOMContentLoaded', (event) => {
    render(<Demo />, document.querySelector('.root'));
});