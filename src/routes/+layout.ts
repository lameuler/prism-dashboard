import type { Camera } from '$lib/cameras.js'
import { toInmate, type Inmate } from '$lib/inmates.js'

export async function load({ fetch }): Promise<{ inmates: Inmate[], cameras: Camera[] }> {
    return {
        inmates: (await (await fetch('/api/inmates')).json()).inmates.map(toInmate),
        cameras: (await (await fetch('/api/cameras')).json())
    }
}
export const prerender = true;