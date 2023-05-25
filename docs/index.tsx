// <!-- Git Hub Site -->
import { default as Demo } from 'Demo/Demo';
import { createRoot } from 'react-dom';
import './index.scss';

const DemoPage = () => {
  return (
    <>
      <div className="demo__header">Демо страница</div>
      <Demo />
    </>
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('.root'));
  root.render(<DemoPage />, root);
});
