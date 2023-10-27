<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { LINK } from './vote';

    let showing: boolean | undefined = undefined;

    onMount(() => {
        update(localStorage)
        const listener = () => update(localStorage)
        window.addEventListener('storage', listener)
        return () => window.removeEventListener('storage', listener)
    })

    function update(storage: Storage) {
        let popup = storage.getItem('popup')
        if (popup === 'false') {
            showing = false
        } else {
            showing = true
            storage.setItem('popup','true')
        }
    }
</script>
{#if showing === false && LINK}
    <div class="fixed right-0 bottom-0 max-w-full box-border px-4 py-6">
        <button class="rounded-full p-1 text-lg font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-600 group" on:click={()=>{ showing = true }}>
            <span class="rounded-full bg-slate-900 px-4 py-2 block bg-opacity-90">Vote now!</span>
            <div class="rounded-full absolute inset-2 -z-10 bg-gradient-to-r from-indigo-500 to-fuchsia-600 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500"/>
        </button>
    </div>
{:else if showing === true && LINK}
    <div class="fixed right-0 bottom-0 max-w-full box-border px-4 py-6 w-80">
        <div transition:fly={{y: 100}} class="rounded-3xl bg-gradient-to-b from-slate-800/50 to-black/70 backdrop-blur-md px-6 py-4 border-2 border-purple-600 shadow-lg">
            <div class="text-xl font-bold flex items-center gap-2">
                <svg class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 11l3 3l8 -8"></path>
                    <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
                </svg>
                <span class="grow">Vote now!</span>
                <button class="p-1.5 -mr-1 rounded-full text-gray-400 hover:bg-gray-800 hover:text-gray-100" on:click={()=>{ showing = false; localStorage.setItem('popup', 'false') }}>
                    <svg class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6l-12 12"></path>
                        <path d="M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="my-2 text-lg">
                Vote for
                <b class="bg-gradient-to-tr from-lime-400 to-cyan-400 bg-clip-text text-transparent">Team wenkAI</b>
                in the
                <b class="bg-gradient-to-br from-fuchsia-400 to-indigo-500 bg-clip-text text-transparent">HacX! 2023 Grand Finals</b>
                at
                <a class="text-blue-500 underline font-medium" href="https://{LINK}">{LINK}</a>
            </div>
        </div>
    </div>
{/if}