<script lang="ts">
    import type { Inmate } from './inmates';

    export let inmate: Inmate
</script>

<div class="flex items-center pl-3 pr-1.5 py-1.5 rounded-lg bg-slate-800 border-red-800 border-2">
    <span class="font-bold text-lg grow gap-1">{ inmate.name }</span>
    <svg class="w-8 h-8 shrink-0 text-red-600" class:invisible={ !inmate.fall_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 21l1 -5l-1 -4l-3 -4h4l3 -3"></path>
        <path d="M6 16l-1 -4l3 -4"></path>
        <path d="M6 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        <path d="M13.5 12h2.5l4 2"></path>
    </svg>
    <svg class="w-8 h-8 shrink-0 text-red-600" class:invisible={ !inmate.heart_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572"></path>
        <path d="M3 13h2l2 3l2 -6l1 3h3"></path>
    </svg>
    <svg class="w-8 h-8 shrink-0 text-red-600" class:invisible={ !inmate.temp_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5"></path>
        <path d="M10 9l4 0"></path>
    </svg>
</div>