/**
 * Получить данные предзарузки страницы
 */
export async function getPreloadData(preloaderPath, options, urlParams) {
  let preloadData;
  if (preloaderPath) {
    try {
      const preloadFunc = await import(`modules/${preloaderPath}`);
      preloadData = await preloadFunc.default(options, urlParams);
    } catch (e) {
      console.error(e);
    }
  }
  return preloadData;
}