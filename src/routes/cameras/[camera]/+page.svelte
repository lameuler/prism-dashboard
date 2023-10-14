<script lang="ts">
    import AutoplayAlert from '$lib/AutoplayAlert.svelte';

    export let data;
</script>

<div class="flex flex-col w-full h-full">
    <a class="flex items-center text-blue-500 px-2 mb-4 ml-6 font-medium" href="/cameras">
        <svg class="h-6 w-6" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 6l-6 6l6 6"></path>
        </svg>
        See all cameras
    </a>
    <AutoplayAlert/>
    <div class="relative grow">
        <video class="absolute w-full h-full px-4 box-border" src={data.uri} muted loop autoplay/>
    </div>
</div>