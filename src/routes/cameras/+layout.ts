export async function load({ fetch }) {
    const cameras = await (await fetch('/api/cameras')).json()
    return { title: 'Security Cameras', cameras }
}