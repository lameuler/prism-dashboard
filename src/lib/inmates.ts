import { faker } from '@faker-js/faker';
import * as d3 from 'd3'

export interface Person {
    sex: string
    id: string
    name: string
}

export interface Inmate extends Person {
    heartrate: number[]
    resprate: number[]
    bodytemp: number[]
    alerts: boolean
    fall_alert?: string | boolean
    heart_alert?: string | boolean
    resp_alert?: string | boolean
    temp_alert?: string | boolean
    urgency: number
    camera: string
}

export interface InmateParams extends Person {
    heart_mean: number
    heart_std: number
    resp_mean: number
    resp_std: number
    temp_mean: number
    temp_std: number
}

export function generatePeople(count: number) {
    const people: Person[] = []
    for (let i = 0; i < count; i++) {
        const sex = faker.person.sex() as 'female' | 'male'
        people.push({
            sex: sex[0].toUpperCase(),
            id: faker.string.nanoid(8),
            name: faker.person.firstName(sex) + ' ' + faker.person.lastName(sex)
        })
    }
    return people
}

export function toInmate(person: Person): Inmate {
    return { 
        ...person,
        heartrate: [],
        bodytemp: [],
        resprate: [],
        camera: '',
        alerts: false,
        urgency: 0
    }
}

const INTERVAL = 60_000
const OFFSET = 5_000
const LEN = 40

export function generateData(inmates: InmateParams[], cameras: string[]) {
    const seed = Math.round((Date.now() + OFFSET) / INTERVAL)
    const norms = Array(LEN).fill(0).map((_, i) => d3.randomNormal.source(d3.randomLcg(seed - LEN + i)))
    norm(norms, 0, 1) // the first time all the RNGs are called it seems to create a cyclic pattern for some reason
    const rand = d3.randomInt.source(d3.randomLcg(seed))

    return inmates.map<Inmate>(i => {

        let inmate: Inmate = { 
            id: i.id,
            name: i.name,
            sex: i.sex,
            heartrate: norm(norms, i.heart_mean, i.heart_std),
            bodytemp: norm(norms, i.temp_mean, i.temp_std),
            resprate: norm(norms, i.resp_mean, i.resp_std),
            camera: cameras.toSorted()[rand(cameras.length-1)()],
            alerts: false,
            urgency: 0
        }

        alerts(inmate, rand(8))

        return inmate
    }).toSorted((a,b) => b.urgency - a.urgency)

    
}

function norm(norms: d3.RandomNormal[], mean: number, std: number) {
    return norms.map(n => n(mean, std)())
}

function alerts(inmate: Inmate, rand: () => number) {

    const heart = inmate.heartrate.at(-1) ?? -1
    if (heart > 110) {
        inmate.heart_alert = 'High heart rate'
        inmate.urgency += 1
    } else if (heart < 55) {
        inmate.heart_alert = 'Low heart rate'
        inmate.urgency += 1
    }
    inmate.urgency += ((heart - 80) / 30)**2

    const resp = inmate.resprate.at(-1) ?? -1
    if (resp > 20) {
        inmate.resp_alert = 'High respiratory rate'
        inmate.urgency += 1
    } else if (resp < 12) {
        inmate.resp_alert = 'Low respiratory rate'
        inmate.urgency += 1
    }
    inmate.urgency += ((resp - 16) / 4.5)**2

    const temp = inmate.bodytemp.at(-1) ?? -1
    if (temp > 38) {
        inmate.temp_alert = 'High body temperature'
        inmate.urgency += 1
    } else if (temp < 36) {
        inmate.temp_alert = 'Low body temperature'
        inmate.urgency += 1
    }
    inmate.urgency += ((temp - 37) / 1.2)**2

    const fall = rand() == 0
    if (fall) {
        inmate.fall_alert = 'Fall detected'
        inmate.urgency += 1.6
    }

    inmate.alerts = Boolean(inmate.fall_alert || inmate.heart_alert || inmate.resp_alert || inmate.temp_alert)
}