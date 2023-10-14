<script lang="ts">
    import * as d3 from 'd3';

    export let data: number[];
    export let warn: boolean = false;
    export let range: [number, number] | undefined = undefined
    export let format = new Intl.NumberFormat()

    let clientHeight: number;
    let clientWidth: number;

    $: extent = d3.extent(data)
    $: min = extent[0] ?? 0
    $: max = extent[1] ?? 0
    $: if (range) {
        min = Math.min(min, range[0])
        max = Math.max(max, range[1])
    }
    $: current = data.length - 1
    $: hovered = current < data.length - 1

    let svg: SVGElement;

    $: x = d3.scaleLinear([ 0, data.length - 1 ], [ 5, clientWidth - 5 ]);
    $: y = d3.scaleLinear([ min, max ], [ clientHeight - 5, 5 ]);
    $: line = d3.line((d, i) => x(i), y);

    function handleMouseMove(e: MouseEvent) {
        let rect = svg.getBoundingClientRect()
        current = Math.round(x.invert(e.clientX - rect.left))
        current = Math.min(Math.max(0, current), data.length - 1)
    }
</script>

<div class="flex h-full w-full items-center text-xl font-bold">
    <div class="hidden lg:block h-full grow mr-4 cursor-crosshair" bind:clientHeight bind:clientWidth>
        <svg class="absolute" bind:this={ svg } height={clientHeight} width={clientWidth} on:mousemove={ handleMouseMove } on:mouseleave={ () => {current = data.length - 1; console.log("leave")} } role="figure">
            {#if isFinite(clientHeight) && isFinite(clientWidth)}
            <path class="stroke-slate-300" fill="none" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" d={line(data)} />
            <circle cx={ x(current) } cy={ y(data[current]) } r="5" fill="currentColor"/>
            {/if}
        </svg>
    </div>
    <span class:warn class="sm:w-16 transition-colors duration-300" class:hovered>{ format.format(data[current]) }</span>
</div>

<style lang="postcss">
    .hovered {
        @apply text-gray-400
    }
</style>