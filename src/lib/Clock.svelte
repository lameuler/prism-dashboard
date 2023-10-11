<script lang="ts">
    import dateFormat from 'dateformat'
    import { onMount } from 'svelte';

    let time = ''
    let frame = 0

    const update = () => {
        time = dateFormat("ddd d mmm h:MM:ss TT")
        frame = requestAnimationFrame(update)
    }

    onMount(() => {
        update()
        return () => cancelAnimationFrame(frame)
    })
</script>

{ time }