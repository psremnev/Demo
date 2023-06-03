/**
 * API Router
 */
import express from 'express';
import appConfig from 'configs/app.config.json';
import { METHOD_TYPE } from 'types';

export const createApiRouter = async(srv) => {
const router = express.Router();

// создаем подключение к сервису

let service = new srv();
await service.connect();

router
  .route(`${appConfig.service_address}/${service.getEndpoint()}`)
  .post(async (req, res) => {
    const { endpoint, method, params, navigation } = req.body;
    let result;
    switch (method) {
      case METHOD_TYPE.CREATE:
        result = await service.create(endpoint, params);
        break;
      case METHOD_TYPE.READ:
        result = await service.read(endpoint, params);
        break;
      case METHOD_TYPE.QUERY:
        result = await service.query(endpoint, params, navigation);
        break;
      default:
        // вызов произвольного метода на сервисе
        const hasMethodOnService = method in service;
        if (hasMethodOnService) {
          result = service[method](endpoint, params);
        } else {
          result = { error: 'Method Not Found on service Articles' };
        }
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
      res.send(await service.update(endpoint, oldData, newData));
    }
  })
  .delete(async (req, res) => {
    const { endpoint, params, method } = req.body;
    if (method === METHOD_TYPE.DELETE) {
      if (!params) {
        return new Error('No parameters passed');
      }
      res.send(await service.delete(endpoint, params));
    }
  });

  return router;
}
const router = express.Router();