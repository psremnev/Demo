// <!-- Git Hub Site -->
import { default as Demo } from 'client_modules/Demo/Demo';
import { createRoot } from 'react-dom';
import './index.scss';

const DemoPage = () => {
  return (
    <>
      <span style={{ width: '100%', textAlign: 'center' }}>Demo Page</span>
      <Demo />
    </>
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('.root'));
  root.render(<DemoPage />, root);
});
