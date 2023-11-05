<script lang="ts">
    import { onMount } from 'svelte';
    import Section from './Section.svelte';
    import Video from './Video.svelte';
    import { sortCameras, type Camera } from './cameras';
    import AutoplayAlert from './AutoplayAlert.svelte';

    export let cameras: Camera[]
    export let limit: number | undefined = undefined
    export let seeAll: string = ""

    const interval = 60_000
    let timeout: number | NodeJS.Timeout = 0
    let refreshing = false

    async function refresh() {
        clearTimeout(timeout)
        refreshing = true
        const result: Camera[] = await (await fetch('/api/cameras')).json()
        cameras = sortCameras(result)
        refreshing = false
        schedule()
    }

    function schedule() {
        const now = Date.now()
        const ms = Math.ceil(now / interval) * interval - now
        
        timeout = setTimeout(() => {
            refresh()
        }, ms > 5000 ? ms : ms + interval)
    }

    let container: HTMLDivElement
    
    onMount(schedule)
</script>
<Section heading="Security Cameras" {seeAll} {refresh} {refreshing}>
    <AutoplayAlert {container}/>
    <div bind:this={container} class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {#each cameras.slice(0, limit) as camera}
            <Video { ...camera } />
        {/each}
    </div>
</Section>