/**
 * API Router
 */
import { Articles } from '../../services/Articles';
import { createApiRouter } from '../createApiRouter';

export const ArticlesRouter =  await createApiRouter(Articles);