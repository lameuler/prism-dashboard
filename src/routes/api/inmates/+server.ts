import { json } from '@sveltejs/kit';
import fs from 'fs/promises'
import { generatePeople, type Person, type InmateParams } from '$lib/inmates'
import * as d3 from 'd3'

const FILE = 'data/inmates.json'
const COUNT = 20

async function init() {
    // load list of inmates from file
    try {
        await fs.stat(FILE)
    } catch {
        const inmates = generatePeople(COUNT)
        fs.mkdir('data', { recursive: true })
        fs.writeFile(FILE, JSON.stringify(inmates))
    }
    const inmates: Person[] = JSON.parse((await fs.readFile(FILE)).toString())

    // generate random data
    const norm = d3.randomNormal.source(d3.randomLcg(5173))
    const heartMean = rounded(norm(70,8))
    const heartStd = rounded(norm(5, 1.5))
    const respMean = rounded(norm(16,2))
    const respStd = rounded(norm(1, 0.5))
    const tempMean = rounded(norm(37,0.4))
    const tempStd = rounded(norm(0.4, 0.2))
    
    return inmates.map<InmateParams>(inmate => {
        return {
            ...inmate,
            heart_mean: heartMean(),
            heart_std: Math.max(heartStd(), 1),
            temp_mean: tempMean(),
            temp_std: Math.max(tempStd(), 0.3),
            resp_mean: respMean(),
            resp_std: Math.max(respStd(), 0.3)
        }
    })
}

function rounded(func: () => number, dp: number = 2) {
    return () => Math.round(func() * 10**dp) / 10**dp
}

// this will only be called once and stored as it is prerendered
export async function GET() {
    return json({ inmates: await init() })
}