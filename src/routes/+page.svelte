<script lang="ts">
    import CameraGrid from '$lib/CameraGrid.svelte';
    import InmateList from '$lib/InmateList.svelte';

</script>

<CameraGrid seeAll="/cameras"/>
<InmateList seeAll="/inmates" limit={5} />