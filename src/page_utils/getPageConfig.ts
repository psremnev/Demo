import page from 'page.config.json';
import { ERROR_MODULE_URL } from 'types';
import { ERROR_OPTIONS } from 'error';

/**
 * Получить конфиг страницы
 */
export function getPageConfig(cleanPath) {
  const pageConfig = page[cleanPath];
  // если в конфиге страниц такой страницы нет то возвращаем что она не найдена
  if (!pageConfig) {
    return {
      module: ERROR_MODULE_URL,
      options: ERROR_OPTIONS.NOT_FOUND,
    };
  }
  return pageConfig;
}
