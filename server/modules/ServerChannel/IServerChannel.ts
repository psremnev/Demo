import { WebSocket } from 'ws';

export interface IClientMsg {
  eventName: string;
  action: string;
  code?: number;
}

export interface IEvent {
  name: string;
  clients: Set<WebSocket>;
}
