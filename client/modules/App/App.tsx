import { lazy, Suspense } from 'react';
import Header from 'App/Header';
import LeftSide from 'App/LeftSide';
import RightSide from 'App/RightSide';
import app from 'configs/app.config.json';
import { Loader } from 'loader';
import { ScrollContainer } from 'scrollContainer';
import 'App/App.scss';

export default function App({ contentData }) {
  const { module, options, hasSearch } = contentData;

  // ВАЖНО: динамический компонент обязательно нужно обернуть в Suspense
  const ContentNode = lazy(() => import(`modules/${module}`));

  return (
    <>
      <Header hasSearch={hasSearch} />
      <main className="app-main">
        {app.leftSide && <LeftSide />}
        <Suspense fallback={<Loader />}>
          <ContentNode {...options} />
        </Suspense>
        {app.rightSide && <RightSide />}
      </main>
    </>
  );
}
