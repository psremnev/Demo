import Index from 'Index';
import { getUrlInfo } from 'utils/getUrlInfo';
import { ADMIN_URL, AUTH_URL } from 'types';
import { getCleanPath } from 'server/utils/getCleanPath';
import { getPageConfig } from 'server/utils/getPageConfig';
import { getPreloadData } from 'server/utils/getPreloadData';
import { isAuth } from 'server/utils/isAuth';

/**
 * Рендер страницы по роуту
 * @param req
 * @param res
 */
export async function renderPage(req, res) {
  const urlInfo = getUrlInfo(req);
  const path = getCleanPath(urlInfo);
  const cookies = req.cookies;

  if (path === ADMIN_URL && !isAuth(cookies)) {
    res.redirect(AUTH_URL);
  }

  const { options, module, preloaderPath, hasSearch } = getPageConfig(path);
  const preloadData = await getPreloadData(
    preloaderPath,
    options,
    urlInfo.urlParams
  );

  const { renderToPipeableStream } = await import('react-dom/server'); // чтобы веб пак не ругался при компиляции клиентского файла
  const { pipe } = renderToPipeableStream(
    <Index
      contentData={{
        module,
        urlInfo,
        cookies,
        options: { ...options, preloadData, urlParams: urlInfo.urlParams },
        hasSearch
      }}
    />,
    {
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    }
  );
}
