export function load({ url }) {
    let param = url.searchParams.get('interval') ?? ''
    let interval = parseInt(param)
    interval = isFinite(interval) ? interval : 250
    interval = Math.max(interval, 100)
    console.log(param, parseInt(param), interval)
    return { interval }
}