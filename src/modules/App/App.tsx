import { lazy, Suspense } from 'react';
import Header from 'App/Header';
import LeftSide from 'App/LeftSide';
import RightSide from 'App/RightSide';
import app from 'app.config.json';
import { Loader } from 'loader';
import { ScrollContainer } from 'scrollContainer';
import 'App/App.scss';

export default function App({ contentData }) {
  const { module, options } = contentData;

  // ВАЖНО: динамический компонент обязательно нужно обернуть в Suspense
  const ContentNode = lazy(() => import(`modules/${module}`));

  return (
    <>
      <Header />
      <main className="app-main">
        {app.leftSide && <LeftSide />}
        <Suspense fallback={<Loader />}>
          <ScrollContainer
            showUpBtn={true}
            showShadow={false}
            showScrollBar={false}
          >
            <ContentNode {...options} />
          </ScrollContainer>
        </Suspense>
        {app.rightSide && <RightSide />}
      </main>
    </>
  );
}
