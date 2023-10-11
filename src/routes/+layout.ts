import type { Inmate } from '$lib/inmates.js'

export async function load({ fetch }) {
    return await (await fetch('/api/inmates')).json()
}

async function inmates(fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) {
    const response: { inmates: Inmate[] } =  await (await fetch('/api/inmates')).json()
    return response.inmates
}