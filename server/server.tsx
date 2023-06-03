/**
 * Точка входа Серверной части приложения
 */
import express from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as bodyParser from 'body-parser';
import { listData, treeData } from 'test_data/TestData';
import { ServerChannel } from 'ServerChannel/ServerChannel';
import { renderPage } from 'page_utils/renderPage';
import * as cookieParser from 'cookie-parser';
import appConfig from 'configs/app.config.json';
import * as favicon from 'serve-favicon';
import { Database } from 'Db/Database';
import { METHOD_TYPE } from 'types';

const serverChannel = new ServerChannel(); // создаем WebSocket подключение
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let database;

const initAsyncModules = async () => {
  // создаем подключение к базе данных
  database = new Database('main_service');
  await database.connect();
};

const appUse = () => {
  app.use(favicon(path.join('./public', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static('build'));
};


// обработка роутинга
const appRoute = () => {
  // роут страниц
  app
    .route(/^\/(?!service|favicon)(\w+)?/)
    .get(async (req, res) => renderPage(req, res));

  // роут api
  app
    .route(appConfig.service_address)
    .post(async (req, res) => {
      const { endpoint, method, params, navigation } = req.body;
      const getData = () => {
        const isList = endpoint === 'List';
        return isList
          ? listData.reverse()
          : treeData
              .filter((item) => {
                if (!params.parent) {
                  return true;
                }
                const parentIsArray = Array.isArray(params.parent);
                // отдаем корневые узлы !item.parent и узлы из parent иначе узлы из parent
                return parentIsArray
                  ? params.parent.includes(item.parent) || !item.parent
                  : params.parent === item.parent;
              })
              .reverse();
      };

      let result;
      switch (method) {
        case METHOD_TYPE.CREATE:
          result = await database.create(endpoint, params);
          break;
        case METHOD_TYPE.READ:
          result = await database.read(endpoint, params);
          break;
        case METHOD_TYPE.QUERY:
          if (endpoint === 'List' || endpoint === 'TreeList') {
            result = getData();
          } else {
            result = await database.query(endpoint, params, navigation);
          }
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
};

initAsyncModules().then(() => {
  // для Демо страницы
  setInterval(() => {
    serverChannel.send('eventone', {
      msg: 'You get data because subscribe on channel'
    });
  }, 1000);

  appUse();
  appRoute();

  app.listen(port, () => {
    console.log(`Server is running at port  ${port}`);
  });
});
