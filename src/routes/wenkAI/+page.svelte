<script lang="ts">
    export let data

    let dots = 0
    setInterval(() => {
        dots++
        dots = dots % 4
    }, data.interval)
</script>

<main class="flex items-center justify-center h-full w-full text-[#00FF00]">
    <pre>
    <b>HACX</b> 2023 TEAM    <b>__   ___    ____
 _      _____  ____  / /__/   |  /  _/
| | /| / / _ \/ __ \/ //_/ /| |  / /  
| |/ |/ /  __/ / / / ,&lt; / ___ |_/ /   
|__/|__/\___/_/ /_/_/|_/_/  |_/___/</b>

             loading{'.'.repeat(dots)}
    </pre>
</main>