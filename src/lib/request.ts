export type RequestJson = (
    url: string,
    data: any,
    headers?: Object,
    method?: string,
) => Promise<Response>

export const requestJson: RequestJson = async (url, data, headers = {}, method = 'POST') => {
    if (method === 'GET') {
        const _url = new URL(url)
        Object.keys(data).map(k => _url.searchParams.set(k, data[k]))
    }
    const _headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    Object.assign(_headers, headers)
    return await fetch(url, {
        method: method,
        headers: _headers,
        body: method === 'POST' ? JSON.stringify(data) : null,
    })
}
