export default function getUrlParams(url: string) {
  const params = {};
  const arrParams = url.match(/[^?&]?([\w]+)=([\w-]+)/g);
  if (arrParams) {
    url.match(/[^?&]?([\w]+)=([\w-]+)/g).map((param) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
  }
  return params;
}
