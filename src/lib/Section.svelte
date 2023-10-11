<script lang="ts">
    export let heading: string = ""
    export let seeAll: string = ""
    export let refresh: (() => any) | undefined = undefined
    export let refreshing: boolean = false

    // let refreshing = false

    // async function onClick() {
    //     if (typeof refresh === 'function' && !refreshing) {
    //         refreshing = true
    //         await refresh()
    //         refreshing = false
    //     }
    // }

</script>

<section class="px-4 sm:px-8 py-8">
    {#if heading}
        <div class="flex items-center p-3">
            <div class="flex grow">
                <h3 class="text-3xl font-bold">{ heading }</h3>
                {#if typeof refresh === 'function'}
                    <button class="shrink-0 mx-2" class:animate-spin = { refreshing } on:click={ refresh }>
                        <svg class="h-10 w-10 p-2 rounded-full text-gray-400 hover:bg-gray-800 hover:text-gray-100 -scale-x-100" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
                        </svg>
                    </button>
                {/if}
            </div>
            {#if seeAll}
                <a href={ seeAll } class="text-blue-500 text-lg font-medium py-1 shrink-0">See all</a>
            {/if}
            <slot name="action"/>
        </div>
    {/if}
    <slot />
</section>