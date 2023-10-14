<script lang="ts">
    import CameraGrid from '$lib/CameraGrid.svelte';
    import InmateList from '$lib/InmateList.svelte';

    export let data
</script>

<CameraGrid seeAll="/cameras" cameras={ data.cameras } limit={4} />
<InmateList seeAll="/inmates" limit={5} />