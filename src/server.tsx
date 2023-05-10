/**
 * Точка входа Серверной части приложения
 */
import express from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as bodyParser from 'body-parser';
import { listData, treeData } from 'moki/TestData';
import { ServerChannel } from 'ServerChannel/ServerChannel';
import { renderPage } from 'page_utils/renderPage';
import * as cookieParser from 'cookie-parser';
import appConfig from 'app.config.json';
import * as favicon from 'serve-favicon';

// создаем WebSocket подключение
const serverChannel = new ServerChannel();

// для Демо страницы
setInterval(() => {
  serverChannel.send('eventone', {
    msg: 'You get data because subscribe on channel',
  });
}, 1000);

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('build', { extensions: ['js', 'jsx', 'css'] }));

// обработка роутинга
app.get(/^\/(?!service|favicon)(\w+)?/, async (req, res) =>
  renderPage(req, res)
);

app.post(appConfig.service_address, function (req, res) {
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
  res.send(getData());
});

app.put(appConfig.service_address, function (req, res) {
  return;
});

app.delete(appConfig.service_address, function (req, res) {
  return;
});

app.listen(port, () => {
  console.log(`Server is running at port  ${port}`);
});
