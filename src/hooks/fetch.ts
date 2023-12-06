import useSWR from 'swr'

export const useFetch = (url: string, options: any = {}, swroptions: any = {}) => {
    if (options.method === undefined) options.method = 'POST'
    if (options.headers === undefined) options.headers = { 'Content-Type': 'application/json' }

    const fetcher = () => fetch(url, options).then(res => res.json())
    return useSWR(url, fetcher, swroptions)
}
