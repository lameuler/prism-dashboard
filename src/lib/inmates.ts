import { faker } from '@faker-js/faker';
import { writable } from 'svelte/store'

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
}

export function generatePeople(count: number) {
    const people: Person[] = []
    for (let i = 0; i < count; i++) {
        const sex = faker.person.sex() as 'female' | 'male'
        people.push({
            sex: sex[0].toUpperCase(),
            id: faker.string.nanoid(16),
            name: faker.person.firstName(sex) + ' ' + faker.person.lastName(sex)
        })
    }
    return people
}

export const inmates = writable<Inmate[]>([])