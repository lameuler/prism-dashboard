export async function load({ fetch }) {
    return await (await fetch('/api/inmates')).json()
}