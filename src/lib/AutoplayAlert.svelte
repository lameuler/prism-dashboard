<script lang="ts">
    import { onMount } from 'svelte';

    export let container: HTMLElement | undefined = undefined
    let blocked = false
    
    onMount(async () => {
        const videos = (container ?? document).querySelectorAll('video')
        if (videos.length > 0) {
            try {
                await videos[0].play()
            } catch (error) {
                if (error instanceof Error && error.name === 'NotAllowedError') {
                    blocked = true
                }
            }
        }
    })

    async function play() {
        const videos = (container ?? document).querySelectorAll('video')
        if (videos.length > 0) {
            try {
                for (const video of videos.values()) {
                    await video.play()
                }
                blocked = false;
            } catch (error) {
                if (error instanceof Error && error.name === 'NotAllowedError') {
                    blocked = true
                }
            }
        }
    }
</script>

{#if blocked}
    <div class="flex gap-2 items-center font-semibold bg-yellow-400 bg-opacity-20 p-2 rounded-xl border-2 border-yellow-600 mb-4">
        <svg class="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14.897 1a4 4 0 0 1 2.664 1.016l.165 .156l4.1 4.1a4 4 0 0 1 1.168 2.605l.006 .227v5.794a4 4 0 0 1 -1.016 2.664l-.156 .165l-4.1 4.1a4 4 0 0 1 -2.603 1.168l-.227 .006h-5.795a3.999 3.999 0 0 1 -2.664 -1.017l-.165 -.156l-4.1 -4.1a4 4 0 0 1 -1.168 -2.604l-.006 -.227v-5.794a4 4 0 0 1 1.016 -2.664l.156 -.165l4.1 -4.1a4 4 0 0 1 2.605 -1.168l.227 -.006h5.793zm-2.887 14l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path>
        </svg>
        <span class="grow">Your browser may be blocking auto-play.</span>
        <button on:click={play} class="bg-blue-700 rounded-md px-3 py-1">Start playing</button>
    </div>
{/if}