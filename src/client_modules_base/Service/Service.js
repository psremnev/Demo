var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { REQUEST_TYPE, METHOD_TYPE } from 'Service/constants';
import appConfig from 'app.config.json';
/**
 * @class Service/Service
 * @description Используется для получения данных с сервисов
 * @public
 */
export default class Service {
    constructor(params) {
        this.headers = { 'Content-Type': 'application/json' };
        this.url = `${appConfig.protocol}://${appConfig.host}:${appConfig.port}${appConfig.service_address}`;
        this.endPoint = params.endpoint;
    }
    getData(method, params, requestType = REQUEST_TYPE.POST, navigation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.url, {
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
                    return yield response.json();
                }
                else {
                    console.error(`Ошибка при выполнении метода ${method}`);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    /* Вызов произвольного метода на точке входа */
    call(method, params) {
        return this.getData(method, params);
    }
    /* Вызов метода создания записи на точке входа */
    create(params) {
        return this.getData(METHOD_TYPE.CREATE, params);
    }
    /* Вызов метода чтения записи на точке входа */
    read(params) {
        return this.getData(METHOD_TYPE.READ, params);
    }
    /* Вызов метода обновления записи на точке входа */
    update(params) {
        return this.getData(METHOD_TYPE.UPDATE, params, REQUEST_TYPE.PUT);
    }
    /* Вызов метода удаления записи на точке входа */
    delete(params) {
        return this.getData(METHOD_TYPE.DELETE, params, REQUEST_TYPE.DELETE);
    }
    /* Вызов метода сполучения записей на точке входа */
    query(params, navigation) {
        // навигация указывает сколько записей запросить и с какой записи делать выборку
        return this.getData(METHOD_TYPE.QUERY, params, undefined, navigation);
    }
}
