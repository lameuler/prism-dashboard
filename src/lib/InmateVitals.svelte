<script lang="ts">
    import InmateVitalsAlert from './InmateVitalsAlert.svelte';
    import MiniGraph from './MiniGraph.svelte';
    import PingAlert from './PingAlert.svelte';
    import type { Inmate } from './inmates';

    export let inmate: Inmate;
    export let refreshing: boolean = false

    const heartFormat = new Intl.NumberFormat('en-SG', { maximumFractionDigits: 0 })
    const respFormat = new Intl.NumberFormat('en-SG', { maximumFractionDigits: 0 })
    const tempFormat = new Intl.NumberFormat('en-SG', { 
        style: 'unit',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        unit: 'celsius'
    })
</script>

<div class="bg-gray-900 rounded-xl px-4 sm:px-8 py-2 ring-red-800" class:ring={ inmate.alerts }>
    <div class="flex flex-col sm:flex-row items-stretch grid-rows-1">
        <div class="flex items-center h-full gap-1 grow sm:mr-4">
            <a href="/cameras/{inmate.camera}">
                <svg class="w-10 h-10 p-1 text-gray-500 hover:text-gray-200" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
                    <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                    <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                    <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
                    <path d="M12 11l0 .01"></path>
                    <path d="M12 18l-3.5 -5a4 4 0 1 1 7 0l-3.5 5"></path>
                </svg>
            </a>
            <span class="font-bold text-xl grow">{ inmate.name }</span>
            <PingAlert ping={ inmate.fall_alert && !refreshing }>
                <svg class="w-10 h-10 p-1 red" class:invisible={ !inmate.fall_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 21l1 -5l-1 -4l-3 -4h4l3 -3"></path>
                    <path d="M6 16l-1 -4l3 -4"></path>
                    <path d="M6 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M13.5 12h2.5l4 2"></path>
                </svg>
            </PingAlert>
        </div>
        <div class="flex items-stretch lg:w-9/12 shrink-0 gap-1.5 sm:gap-0">
            <div class="flex items-center h-full lg:w-1/3 gap-1">
                <PingAlert ping={ inmate.heart_alert && !refreshing }>
                    <svg class="w-10 h-10 p-1 shrink-0" class:red={ inmate.heart_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572"></path>
                        <path d="M3 13h2l2 3l2 -6l1 3h3"></path>
                    </svg>
                </PingAlert>
                <MiniGraph data={ inmate.heartrate } range={[60, 100]} format={ heartFormat } />
            </div>
            <div class="flex items-center h-full lg:w-1/3 gap-1 sm:gap-2">
                <PingAlert ping={ inmate.resp_alert && !refreshing }>
                    <svg class="w-10 h-10 p-1 shrink-0" class:red={ inmate.resp_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6.081 20c1.612 0 2.919 -1.335 2.919 -2.98v-9.763c0 -.694 -.552 -1.257 -1.232 -1.257c-.205 0 -.405 .052 -.584 .15l-.13 .083c-1.46 1.059 -2.432 2.647 -3.404 5.824c-.42 1.37 -.636 2.962 -.648 4.775c-.012 1.675 1.261 3.054 2.877 3.161l.203 .007z"></path>
                        <path d="M17.92 20c-1.613 0 -2.92 -1.335 -2.92 -2.98v-9.763c0 -.694 .552 -1.257 1.233 -1.257c.204 0 .405 .052 .584 .15l.13 .083c1.46 1.059 2.432 2.647 3.405 5.824c.42 1.37 .636 2.962 .648 4.775c.012 1.675 -1.261 3.054 -2.878 3.161l-.202 .007z"></path>
                        <path d="M9 12a3 3 0 0 0 3 -3a3 3 0 0 0 3 3"></path>
                        <path d="M12 4v5"></path>
                    </svg>
                </PingAlert>
                
                <MiniGraph data={ inmate.resprate } range={[12, 20]} format={ respFormat } />
            </div>
            <div class="flex items-center h-full lg:w-1/3 gap-1 sm:gap-2">
                <PingAlert ping={ inmate.temp_alert && !refreshing }>
                    <svg class="w-10 h-10 p-1 shrink-0" class:red={ inmate.temp_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5"></path>
                        <path d="M10 9l4 0"></path>
                    </svg>
                </PingAlert>
                
                <MiniGraph data={ inmate.bodytemp } range={[36, 38]} format={ tempFormat } />
            </div>
        </div>
    </div>
    <div class="flex flex-col md:flex-row">
        <InmateVitalsAlert alert={ inmate.fall_alert } />
        <InmateVitalsAlert alert={ inmate.heart_alert } />
        <InmateVitalsAlert alert={ inmate.resp_alert } />
        <InmateVitalsAlert alert={ inmate.temp_alert } />
    </div>
</div>

<style lang="postcss">
    .red {
        @apply text-red-500 rounded-full bg-red-950
    }
</style>