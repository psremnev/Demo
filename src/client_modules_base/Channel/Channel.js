import { ClientMsgActionType } from 'Channel/constants';
import { STATUS } from 'Channel/constants';
import appConfig from 'app.config.json';
/**
 * @class Channel/Channel
 * @description
 *  Используется для подписки на события от сервисов
 *  Создать новый класс channel: const channel = new Channel
 * @public
 */
export default class Channel {
    constructor() {
        this.subscribes = new Set();
    }
    /**
     * Событие сообщения с сервера, если событие найдено по имени то зовем его коллбек
     * @param msg
     */
    onMessage(msg) {
        try {
            const { eventName, data, code } = JSON.parse(msg.data);
            // если ошибка подписки
            if (code === STATUS.FAIL) {
                console.error(data);
                this.subscribes.forEach((subscription) => {
                    if (subscription.status === STATUS.FAIL) {
                        this.subscribes.delete(subscription);
                    }
                });
                return;
            }
            // если все ок
            this.subscribes.forEach((subscription) => {
                if (subscription.status !== STATUS.SUCCESS) {
                    subscription.status = STATUS.SUCCESS;
                }
                if (subscription.eventName === eventName) {
                    subscription.callback(data);
                }
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * Подключение к вебсокету
     */
    connect() {
        this.url = `ws://${appConfig.host}:${appConfig.websocket_port}`;
        this.ws = new WebSocket(this.url);
        this.ws.onmessage = this.onMessage.bind(this);
    }
    /**
     * Добавить подписку
     */
    addSubscription(eventName, callback) {
        this.subscribes.add({ eventName, callback, status: 0 });
    }
    /**
     * Послать сообщение о подписке или отписке от события
     * @param eventName
     * @param action
     */
    sendSubscriptionMessage(eventName, action) {
        const send = () => {
            try {
                this.ws.send(JSON.stringify({ eventName, action }));
            }
            catch (e) {
                console.error(e);
            }
        };
        const sendIfWsNotReady = () => {
            const id = setInterval(() => {
                if (this.ws.readyState === STATUS.SUCCESS) {
                    send();
                    clearInterval(id);
                }
            }, 1000);
        };
        this.ws.readyState === STATUS.FAIL ? sendIfWsNotReady() : send();
    }
    /**
     * Подписаться на событие
     * @param eventName
     * @param callback
     */
    subscribe(eventName, callback) {
        if (!this.ws) {
            this.connect();
        }
        this.addSubscription(eventName, callback);
        this.sendSubscriptionMessage(eventName, ClientMsgActionType.SUBSCRIBE);
    }
    /**
     * Отписаться от события
     * @param eventName
     */
    unsubscribe(eventName) {
        this.sendSubscriptionMessage(eventName, ClientMsgActionType.UNSUBSCRIBE);
        this.subscribes.forEach((subscription) => {
            if (subscription.eventName === eventName) {
                this.subscribes.delete(subscription);
            }
        });
        if (this.subscribes.size === 0) {
            this.ws.close();
            this.ws = null;
        }
    }
}
