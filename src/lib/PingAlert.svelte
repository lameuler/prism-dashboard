<script lang="ts">
    export let ping: any = false
</script>

<div class="relative flex items-center justify-center shrink-0">
    {#if ping}
        <div class="animate-ping absolute bg-red-700 opacity-50 w-5/6 h-5/6 rounded-full"></div>
    {/if}
    <slot/>
</div>