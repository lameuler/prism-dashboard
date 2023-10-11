import { json } from '@sveltejs/kit';

const start = new Date();
const number = Math.floor(Math.random() * 100);

export async function GET() {
    return json({ start, number });
}