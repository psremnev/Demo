import Service from 'Service/Service';

export default async function(opts, params): Promise<object> {
    return {
        tree: await new Service({endpoint: 'TreeList'}).query({parent: []}),
        list: await new Service({endpoint: 'List'}).query({})
    }
}