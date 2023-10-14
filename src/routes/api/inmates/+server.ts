import { json } from '@sveltejs/kit';
import fs from 'fs/promises'
import { generatePeople, type Inmate, type Person } from '$lib/inmates'
import * as d3 from 'd3'
import wait from '$lib/wait.js'
import { _locateInmate } from '../cameras/+server'

const FILE = 'data/inmates.json'

const INTERVAL = 60_600
const COUNT = 20
const DATA_LEN = 40

const data: { [id: string]: { inmate: Inmate, heartRand: () => number, respRand: () => number, tempRand: () => number, fallRand: () => number } } = {}

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
    const heartMean = d3.randomNormal(70,8)
    const heartStd = d3.randomNormal(5, 1.5)
    const respMean = d3.randomNormal(16,2)
    const respStd = d3.randomNormal(1, 0.5)
    const tempMean = d3.randomNormal(37,0.4)
    const tempStd = d3.randomNormal(0.4, 0.2)
    inmates.forEach(inmate => {
        // randomly generate random number generators
        const heartRand = rounded(d3.randomNormal(heartMean(), Math.max(heartStd(),1)))
        const respRand = rounded(d3.randomNormal(respMean(), Math.max(respStd(),0.1)))
        const tempRand = rounded(d3.randomNormal(tempMean(), Math.max(tempStd(),0.1)))
        const fallRand = d3.randomInt(8)

        const heartrate = Array(DATA_LEN).fill(0).map(heartRand)
        const resprate = Array(DATA_LEN).fill(0).map(respRand)
        const bodytemp = Array(DATA_LEN).fill(0).map(tempRand)

        data[inmate.id] = {
            inmate: {
                ...inmate, 
                heartrate, resprate, bodytemp, 
                urgency: 0, alerts: false, camera: ''
            },
            heartRand, respRand, tempRand, fallRand
        }
    })

    updateAll()
}

function updateAll() {
    Object.keys(data).forEach(id => {
        updateInmate(id)
    })
    const now = Date.now()
    const ms = Math.ceil(now / INTERVAL) * INTERVAL - now - 15_000
    setTimeout(() => updateAll(), ms > 5000 ? ms : ms + INTERVAL)
}

function updateInmate(id: string) {
    const i = data[id]
    i.inmate.urgency = 0
    i.inmate.alerts = false

    i.inmate.heartrate.shift()
    const heart = i.heartRand()
    i.inmate.heartrate.push(heart)
    i.inmate.heart_alert = undefined
    if (heart > 110) {
        i.inmate.heart_alert = 'High heart rate'
        i.inmate.urgency += 1
    } else if (heart < 55) {
        i.inmate.heart_alert = 'Low heart rate'
        i.inmate.urgency += 1
    }
    i.inmate.urgency += ((heart - 80) / 30)**2

    i.inmate.resprate.shift()
    const resp = i.respRand()
    i.inmate.resprate.push(resp)
    i.inmate.resp_alert = undefined
    if (resp > 20) {
        i.inmate.resp_alert = 'High respiratory rate'
        i.inmate.urgency += 1
    } else if (resp < 12) {
        i.inmate.resp_alert = 'Low respiratory rate'
        i.inmate.urgency += 1
    }
    i.inmate.urgency += ((resp - 16) / 4.5)**2

    i.inmate.bodytemp.shift()
    const temp = i.tempRand()
    i.inmate.bodytemp.push(temp)
    i.inmate.temp_alert = undefined
    if (temp > 38) {
        i.inmate.temp_alert = 'High body temperature'
        i.inmate.urgency += 1
    } else if (temp < 36) {
        i.inmate.temp_alert = 'Low body temperature'
        i.inmate.urgency += 1
    }
    i.inmate.urgency += ((temp - 37) / 1.2)**2

    const fall = i.fallRand() == 0
    i.inmate.fall_alert = undefined
    if (fall) {
        i.inmate.fall_alert = 'Fall detected'
        i.inmate.urgency += 1.6
    }

    i.inmate.alerts = Boolean(i.inmate.fall_alert || i.inmate.heart_alert || i.inmate.resp_alert || i.inmate.temp_alert)

    i.inmate.camera = _locateInmate(id)
}

function rounded(func: () => number, dp: number = 2) {
    return () => Math.round(func() * 10**dp) / 10**dp
}

export async function GET() {
    if(Object.keys(data).length == 0) {
        await init()
    }
    const inmates = Object.values(data).map(i => i.inmate)
    inmates.sort((a,b) => b.urgency - a.urgency )
    // await wait(300) // artificial delay for testing
    return json({ inmates })
}