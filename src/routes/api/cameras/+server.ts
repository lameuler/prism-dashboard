import type { Camera } from '$lib/cameras'
import { json } from '@sveltejs/kit';
import fs from 'fs/promises'

const FILE = 'data/cameras.json'

const result: { id: string, uri: string }[] = JSON.parse((await fs.readFile(FILE)).toString())

export async function GET() {
    return json(result)
}