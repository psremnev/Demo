/**
 * Page Router
 */
import express from 'express';
import { renderPage } from 'server/utils/renderPage';

const address = /^\/(?!service|favicon)(\w+)?/;
const router = express.Router();

router.route(address).get(async (req, res) => renderPage(req, res));

export { address as PageAddress, router as PageRouter };