/**
 * API Router
 */
import express from 'express';
import appConfig from 'configs/app.config.json';
import { METHOD_TYPE } from 'types';

export const createApiRouter = async (endpoint) => {
  const data = [];
  const router = express.Router();
  // создаем подключение к сервису

  router
    .route(`${appConfig.service_address}/${endpoint}`)
    .post(async (req, res) => {
      const { method, params, navigation } = req.body;
      let result;
      switch (method) {
        case METHOD_TYPE.CREATE:
          const item = params[0];
          item.id = data.length + 1;
          data.push(item);
          result = item;
          break;
        case METHOD_TYPE.READ:
          const index = data.findIndex((el) => el.id === Number(params.id));
          result = data[index];
          break;
        case METHOD_TYPE.QUERY:
          result = data.slice(navigation.skip, navigation.limit);
          break;
      }
      res.send(result);
    })
    .put(async (req, res) => {
      const { params, method } = req.body;
      if (method === METHOD_TYPE.UPDATE) {
        const { oldData, newData } = params;
        if (!oldData || !newData) {
          return new Error('No oldData or newData parameters passed');
        }
        const index = data.findIndex((el) => el.id === oldData.id);
        data[index] = newData;
        res.send(newData);
      }
    })
    .delete(async (req, res) => {
      const { params, method } = req.body;
      if (method === METHOD_TYPE.DELETE) {
        if (!params) {
          return new Error('No parameters passed');
        }
        const index = data.findIndex((el) => el.id === params[0].id);
        data.splice(index, 1);
        res.send(params[0]);
      }
    });

  return router;
};
