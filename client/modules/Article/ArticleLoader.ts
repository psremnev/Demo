import Service from 'Service/Service';

export default async function (opts, urlParams): Promise<object> {
  const service = new Service({ endpoint: 'articles' });
  return await new Service({ endpoint: 'articles' }).read({ id: urlParams.id });
}
