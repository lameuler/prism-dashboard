<script lang="ts">
    import type { Inmate } from './inmates';
    import Section from './Section.svelte';
    import VitalsAlerts from './VitalsAlerts.svelte';

    export let alerts: Inmate[] = []
    export let refresh: (() => any) | undefined = undefined
    export let refreshing = false
    export let close: (() => any) | undefined = undefined

</script>

<div class="py-2 bg-gray-900 shadow-xl shadow-black rounded-xl border-black border-2">
    <div class="flex text-lg px-3 py-1 items-center">
        <span class="font-bold text-xl">{ alerts.length } Alert{ alerts.length === 1 ? '' : 's'}</span>
        <button class="shrink-0 mx-1" class:animate-spin = { refreshing } on:click={ refresh }>
            <svg class="h-9 w-9 p-1.5 rounded-full text-gray-400 hover:bg-gray-800 hover:text-gray-100 -scale-x-100" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
            </svg>
        </button>
        <div class="grow"/>
        <a class="font-medium shrink-0 text-blue-500 self-justify-end" href="/inmates" on:click={ close }>See all vitals</a>
    </div>
    <div class="max-h-56 flex flex-col px-3 py-1 gap-2 overflow-y-scroll">
        {#each alerts as inmate }
            <VitalsAlerts {inmate} />
        {/each}
    </div>
</div>