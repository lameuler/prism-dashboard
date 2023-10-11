import { faker } from '@faker-js/faker';
import { writable } from 'svelte/store'

export interface Person {
    sex: string
    id: string
    name: string
}

export interface Inmate extends Person {
    heartrate: number[]
    bodytemp: number[]
    fall_alert?: string | boolean
    heart_alert?: string | boolean
    temp_alert?: string | boolean
    urgency: number
}

export function generatePeople(count: number) {
    const people: Person[] = []
    for (let i = 0; i < count; i++) {
        const sex = faker.person.sex() as 'female' | 'male'
        faker.person.fullName({ sex })
        faker.string.nanoid(16)
        people.push({
            sex: sex[0].toUpperCase(),
            id: faker.string.nanoid(16),
            name: faker.person.fullName({ sex })
        })
    }
    return people
}

export const inmates = writable<Inmate[]>([])