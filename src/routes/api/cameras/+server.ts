import type { Camera } from '$lib/cameras'
import { json } from '@sveltejs/kit';
import fs from 'fs/promises'

const FILE = 'data/cameras.json'
const INTERVAL = 60_600

const result: { id: string, uri: string }[] = JSON.parse((await fs.readFile(FILE)).toString())
const cameras: Camera[] = result.map(c => { 
    return {
        ...c,
        urgency: Math.random()
    }
})

updateAll()

function updateAll() {
    cameras.forEach(c => {
        c.urgency = Math.random()
    })
    cameras.sort((a,b) => b.urgency - a.urgency)
    const now = Date.now()
    const ms = Math.ceil(now / INTERVAL) * INTERVAL - now - 15_000
    setTimeout(() => updateAll(), ms > 5000 ? ms : ms + INTERVAL)
}

export function _locateInmate(inmateId: string) {
    const i = Math.round(Math.random()*(cameras.length - 1))
    return cameras[i].id
}

export async function GET() {
    return json(cameras)
}