/**
 * Точка входа клиентской части приложения
 */
import { hydrateRoot } from 'react-dom/client';
import { getStateInfo } from 'src/base_utils/getStateInfo';
import Index from 'Index';

hydrateRoot(document, <Index contentData={getStateInfo()} />);
