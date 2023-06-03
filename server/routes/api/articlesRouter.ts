/**
 * API Router
 */
import express from 'express';
import appConfig from 'configs/app.config.json';
import { Articles } from '../../services/Articles';
import { METHOD_TYPE } from 'types';

let database;
const router = express.Router();

// создаем подключение к базе данных
database = new Articles();
await database.connect();

router
  .route(`${appConfig.service_address}/${database.getEndpoint()}`)
  .post(async (req, res) => {
    const { endpoint, method, params, navigation } = req.body;
    let result;
    switch (method) {
      case METHOD_TYPE.CREATE:
        result = await database.create(endpoint, params);
        break;
      case METHOD_TYPE.READ:
        result = await database.read(endpoint, params);
        break;
      case METHOD_TYPE.QUERY:
        result = await database.query(endpoint, params, navigation);
        break;
    }
    res.send(result);
  })
  .put(async (req, res) => {
    const { endpoint, params, method } = req.body;
    if (method === METHOD_TYPE.UPDATE) {
      const { oldData, newData } = params;
      if (!oldData || !newData) {
        return new Error('No oldData or newData parameters passed');
      }
      res.send(await database.update(endpoint, oldData, newData));
    }
  })
  .delete(async (req, res) => {
    const { endpoint, params, method } = req.body;
    if (method === METHOD_TYPE.DELETE) {
      if (!params) {
        return new Error('No parameters passed');
      }
      res.send(await database.delete(endpoint, params));
    }
  });

export { router as ArticlesRouter };
