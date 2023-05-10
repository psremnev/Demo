import { REQUEST_TYPE, METHOD_TYPE } from 'Service/constants';
import appConfig from 'app.config.json';

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
    this.url = `${appConfig.protocol}://${appConfig.host}:${appConfig.port}${appConfig.service_address}`;
    this.endPoint = params.endpoint;
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
          navigation,
        }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Ошибка при выполнении ${method}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /* Вызов произвольного метода на точке входа */
  async call(method: string, params: object): Promise<any> {
    return this.getData(method, params);
  }

  /* Вызов метода чтения записи на точке входа */
  async read(params: object): Promise<any> {
    return this.getData(METHOD_TYPE.READ, params);
  }

  async update(params: object): Promise<any> {
    return this.getData(METHOD_TYPE.UPDATE, params, REQUEST_TYPE.PUT);
  }

  async delete(params: object): Promise<any> {
    return this.getData(METHOD_TYPE.DELETE, params, REQUEST_TYPE.DELETE);
  }

  async query(params: object, navigation?: object): Promise<any> {
    // навигация указывает сколько записей запросить и с какой записи делать выборку
    return this.getData(METHOD_TYPE.QUERY, params, undefined, navigation);
  }
}
