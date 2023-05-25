// <!-- Git Hub Site -->
import { default as Demo } from 'client_modules/Demo/Demo';
import { createRoot } from 'react-dom';
import './index.scss';

const DemoPage = () => {
  return (
    <>
      <div style={ { textAlign: 'center', fontSize: 20, fontWeight: 'bold' } }>
        Demo Page
      </div>
      <Demo />
    </>
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('.root'));
  root.render(<DemoPage />, root);
});
