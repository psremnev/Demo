export interface ISubscription {
  eventName: string;
  callback: Function;
  status: number;
}
