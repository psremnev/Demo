import { WebSocketServer, WebSocket } from 'ws';
import { IClientMsg, IEvent } from 'ServerChannel/IServerChannel';
import { ClientMsgActionType } from 'ServerChannel/constants';
import appConfig from 'app.config.json';

/**
 * @class ServerChannel/ServerChannel
 * @description Websocket Server
 */
export class ServerChannel {
  private wsEvents: Set<WebSocket> = new Set();
  private wsServer: WebSocketServer;

  constructor() {
    this.wsServer = new WebSocketServer({ port: appConfig.websocket_port });

    this.wsServer.on('connection', (wsClient: WebSocket) => {
      // подписываемся на событие от клиентов
      wsClient.on('message', (msg: string) => {
        try {
          const data: IClientMsg = JSON.parse(msg);

          // если не задано имя события или тип то ничего не делаем
          if (!data.eventName || !data.action) {
            wsClient.send(
              JSON.stringify({
                eventName: data.eventName,
                code: 0,
                data: `Subscription event name or action not passed: eventName: ${data.eventName}, action: ${data.action}`
              })
            );
            return;
          }

          // если уже есть подписки по событию то добавляем или удаляем по нему клиентов в зависимости от action
          let hasEvent = false;
          this.wsEvents.forEach((event: IEvent) => {
            if (data.eventName === event.name) {
              hasEvent = true;
              data.action === ClientMsgActionType.SUBSCRIBE
                ? event.clients.add(wsClient)
                : event.clients.delete(wsClient);

              // если в событии нет клиентов то удаляем его
              if (!event.clients.size) {
                delete this.wsEvents[data.eventName];
              }
            }
          });

          // если нету то добавляем новое событие
          if (!hasEvent) {
            this.wsEvents.add({
              name: data.eventName,
              clients: new Set().add(wsClient)
            });
          }
        } catch (e) {
          console.error(e);
        }
      });
    });
  }

  /**
   * Отправить сообщение клиентaм по событию на которое они подписаны
   * @param eventName
   * @param data
   */
  send(eventName: string, data: object) {
    try {
      this.wsEvents.forEach((event) => {
        if (event.name === eventName) {
          event.clients.forEach((wsClient) => {
            wsClient.send(JSON.stringify({ eventName, data }));
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
}
