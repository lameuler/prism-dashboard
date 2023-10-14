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
    <svg class="w-8 h-8 shrink-0 text-red-600" class:invisible={ !inmate.resp_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6.081 20c1.612 0 2.919 -1.335 2.919 -2.98v-9.763c0 -.694 -.552 -1.257 -1.232 -1.257c-.205 0 -.405 .052 -.584 .15l-.13 .083c-1.46 1.059 -2.432 2.647 -3.404 5.824c-.42 1.37 -.636 2.962 -.648 4.775c-.012 1.675 1.261 3.054 2.877 3.161l.203 .007z"></path>
        <path d="M17.92 20c-1.613 0 -2.92 -1.335 -2.92 -2.98v-9.763c0 -.694 .552 -1.257 1.233 -1.257c.204 0 .405 .052 .584 .15l.13 .083c1.46 1.059 2.432 2.647 3.405 5.824c.42 1.37 .636 2.962 .648 4.775c.012 1.675 -1.261 3.054 -2.878 3.161l-.202 .007z"></path>
        <path d="M9 12a3 3 0 0 0 3 -3a3 3 0 0 0 3 3"></path>
        <path d="M12 4v5"></path>
    </svg>
    <svg class="w-8 h-8 shrink-0 text-red-600" class:invisible={ !inmate.temp_alert } viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5"></path>
        <path d="M10 9l4 0"></path>
    </svg>
</div>