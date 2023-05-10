export default async function (opts, params): Promise<object> {
    return {
        hi: 'im preload',
        opts,
        params
    }
}