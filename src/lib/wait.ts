export default function wait(millis: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, millis)
    })
}