import { REQUEST_TYPE, METHOD_TYPE } from 'Service/constants';
import appConfig from 'configs/app.config.json';

/**
 * @class Service/Service
 * @description Используется для получения данных с сервисов
 * @public
 */
export default class Service {
  // точка входадля микросервиса, если не указана то метод будет вызван на основном сервисе
  private endPoint: string;
  private url: string;
  private headers = { 'Content-Type': 'application/json' };

  constructor(params) {
    this.endPoint = params.endpoint;
    this.url = `${appConfig.protocol}://${appConfig.host}:${appConfig.port}${appConfig.service_address}/${this.endPoint}`;
  }

  private async getData(
    method: string,
    params: object,
    requestType: string = REQUEST_TYPE.POST,
    navigation?: object
  ): Promise<any> {
    try {
      const response = await fetch(this.url, {
        method: requestType,
        headers: this.headers,
        body: JSON.stringify({
          endpoint: this.endPoint,
          method,
          params,
          navigation
        })
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Ошибка при выполнении метода ${method}: ${response.statusText}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /* Вызов произвольного метода на точке входа */
  call(method: string, params: object): Promise<any> {
    return this.getData(method, params);
  }

  /* Вызов метода создания записи на точке входа */
  create(params: object): Promise<any> {
    return this.getData(METHOD_TYPE.CREATE, params);
  }

  /* Вызов метода чтения записи на точке входа */
  read(params: object): Promise<any> {
    return this.getData(METHOD_TYPE.READ, params);
  }

  /* Вызов метода обновления записи на точке входа */
  update(params: { oldData: object; newData: object }): Promise<any> {
    return this.getData(METHOD_TYPE.UPDATE, params, REQUEST_TYPE.PUT);
  }

  /* Вызов метода удаления записи на точке входа */
  delete(params: object): Promise<any> {
    return this.getData(METHOD_TYPE.DELETE, params, REQUEST_TYPE.DELETE);
  }

  /* Вызов метода сполучения записей на точке входа */
  query(params: object, navigation?: object): Promise<any> {
    // навигация указывает сколько записей запросить и с какой записи делать выборку
    return this.getData(METHOD_TYPE.QUERY, params, undefined, navigation);
  }
}
