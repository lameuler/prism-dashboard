<script lang="ts">
    import { LINK } from '$lib/vote.js';

    export let data

    let dots = 0
    setInterval(() => {
        dots++
        dots = dots % 4
    }, data.interval)
</script>

<main class="flex items-center justify-center h-full w-full text-[#00FF00]">
    <pre>
    <b>HACX!</b> 2023 TEAM    <b>__   ___    ____
  _      _____  ____  / /__/   |  /  _/
 | | /| / / _ \/ __ \/ //_/ /| |  / /
 | |/ |/ /  __/ / / / ,&lt; / ___ |_/ /
 |__/|__/\___/_/ /_/_/|_/_/  |_/___/</b>

{#if LINK}
<span>              [ <a href="https://{LINK}" class="hover:underline"><b>VOTE NOW</b></a> ]</span>
{:else}
<span>               loading{'.'.repeat(dots)}</span>
{/if}
    </pre>
</main>