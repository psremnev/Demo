import getUrlParams from 'utils/getUrlParams';
import appConfig from 'configs/app.config.json';

export function getUrlInfo(req?): IUrlInfo {
  return {
    urlParams: getUrlParams(req?.url),
    protocol: `${req?.protocol}:`,
    host: req?.hostname,
    path: req?.path,
    port: appConfig.port
  };
}

export interface IUrlInfo {
  urlParams: object;
  protocol: string;
  host: string;
  path: string;
  port: string;
}
