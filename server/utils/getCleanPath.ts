/**
 * Вычисляем базовый роутинг
 */
export function getCleanPath(urlInfo) {
  const pathRegex = /^\/[a-z]*/;
  return urlInfo.path.match(pathRegex)[0];
}
