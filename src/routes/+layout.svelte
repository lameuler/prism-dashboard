<script lang="ts">
	import { writable } from 'svelte/store';
    import { onMount, setContext } from 'svelte';
    import { fly } from 'svelte/transition'
    import { page } from '$app/stores';
    import type { Inmate } from '$lib/inmates';
    import Clock from '$lib/Clock.svelte';
    import "../app.css";
    import AlertList from '$lib/AlertList.svelte';

    export let data

    const title = writable('')
    setContext('title', title)

    const interval = 60_000
    let timeout: number | NodeJS.Timeout | undefined = undefined

    const inmates = writable({ inmates: data.inmates as Inmate[], refreshing: false })

    async function refresh() {
        clearTimeout(timeout)
        $inmates = { inmates: $inmates.inmates, refreshing: true }
        const result = await fetch('/api/inmates')
        $inmates = { inmates: (await result.json()).inmates, refreshing: false }
        schedule()
    }

    function schedule() {
        const now = Date.now()
        const ms = Math.ceil(now / interval) * interval - now
        
        timeout = setTimeout(() => {
            refresh()
        }, ms > 5000 ? ms : ms + interval)
    }

    setContext('inmates', inmates)
    setContext('inmates-refresh', refresh)

    $: alerts = $inmates.inmates.filter(i => i.alerts)

    let showing = false
    let alertList: HTMLDivElement | undefined = undefined

    function clickOutside(event: MouseEvent) {
        if (!alertList?.contains(event.target as Node)) showing = false
    }

    onMount(schedule)

    let fullscreen: boolean | undefined = undefined;

    onMount(() => {
        fullscreen = document.fullscreenEnabled ? document.fullscreenElement !== null : undefined
        document.addEventListener('fullscreenchange', () => fullscreen = document.fullscreenElement !== null)
    })

    function toggleFullscreen() {
        if (fullscreen) document.exitFullscreen()
        else document.documentElement.requestFullscreen()
    }
    
</script>

<div class="flex flex-col h-full max-w-7xl mx-auto">
    <header class="p-4 sm:p-8 flex items-baseline">
        <section class="flex flex-col md:flex-row grow gap-2 justify-between items-stretch md:items-center">
            <div class="flex items-center gap-2 relative">
                <a class="flex items-center gap-3" href="/">
                    <img class="h-8 w-8" src="/favicon96.png" alt=""/>
                    <h3 class="text-4xl font-bold grow">Changi Prison</h3>
                </a>
                <button on:click|stopPropagation={ () => showing = !showing } class="px-3 py-1 ml-2 flex items-center gap-2 bg-gray-900 border-gray-800 border rounded-md">
                    <svg class="fill-red-500 h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0"></path>
                    </svg>
                    <span class="text-xl font-bold">{ alerts.length }</span>
                </button>
                {#if showing}
                    <div class="absolute self-start justify-self-end top-full right-0 z-50 max-w-full w-96 mt-1" 
                        transition:fly={{ y: -20, duration: 200 }}
                        bind:this={alertList}
                        >
                        <AlertList {alerts} {refresh} refreshing={ $inmates.refreshing } close={ () => showing = false }/>
                    </div>
                {/if}
            </div>
            <span class="text-xl font-medium font-mono text-gray-300 pl-2">
                <Clock />
            </span>
        </section>
        {#if typeof fullscreen === 'boolean' }
            <button on:click={ toggleFullscreen } class="ml-2 p-2 -translate-y-0.5 rounded-full text-gray-400 hover:bg-gray-800 hover:text-gray-100">
                <svg class="h-7 w-7" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    {#if !fullscreen }
                        <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
                        <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                        <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
                    {:else}
                        <path d="M15 19v-2a2 2 0 0 1 2 -2h2"></path>
                        <path d="M15 5v2a2 2 0 0 0 2 2h2"></path>
                        <path d="M5 15h2a2 2 0 0 1 2 2v2"></path>
                        <path d="M5 9h2a2 2 0 0 0 2 -2v-2"></path>
                    {/if}
                </svg>
            </button>
        {/if}
    </header>
    <main class="grow">
        <slot />
    </main>
    <footer class="p-4 text-center text-gray-400">
        <a class="underline" href="/wenkAI">Team <b class="font-mono">wenkAI</b></a> | <a class="underline" href="https://hacx.sg">HacX 2023</a><br/>
        Designed by <a class="underline" href="https://ler.sg">Lam Eu Ler</a>
    </footer>
</div>

<svelte:head>
    <title>
        { alerts?.length > 0 ? `(${alerts.length}) ` : ``}
        { $page.data.title ? $page.data.title : '' }
        { $page.data.title && !$page.data.override ? '@' : '' }
        { $page.data.override ? '' : 'Changi Prison' } | PrisM
    </title>
</svelte:head>
<svelte:body on:click={ clickOutside }/>