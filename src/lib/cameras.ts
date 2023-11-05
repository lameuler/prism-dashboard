import { writable } from 'svelte/store'
import * as d3 from 'd3'

export interface Camera {
    id: string,
    uri: string,
    urgency?: number
}

const INTERVAL = 60_000
const OFFSET = 5_000

export function sortCameras(cameras: Camera[]) {
    const seed = Math.round((Date.now() + OFFSET) / INTERVAL)
    const rand = d3.randomUniform.source(d3.randomLcg(seed))()
    cameras.forEach(c => c.urgency = rand())
    return cameras.toSorted((a,b) => (b.urgency ?? 0) - (a.urgency ?? 0))
}