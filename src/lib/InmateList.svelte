<script lang="ts">
    import { getContext } from 'svelte';
    import InmateVitals from './InmateVitals.svelte';
    import Section from './Section.svelte';
    import type { Inmate } from './inmates';
    import type { Writable } from 'svelte/store';

    export let seeAll: string = ""
    export let limit: number | undefined = undefined

    const inmates = getContext<Writable<{ inmates: Inmate[], refreshing: boolean }>>('inmates')
    const refresh = getContext<() => void>('inmates-refresh')

</script>

<Section heading="Inmate Vitals" {seeAll} {refresh} refreshing={ $inmates.refreshing }>
    <div class="flex gap-4 flex-col">
        {#each $inmates.inmates.slice(0, limit) as inmate }
            <InmateVitals { inmate } refreshing={ $inmates.refreshing }/>
        {/each}
    </div>
</Section>