<script lang="ts">
    import CameraGrid from '$lib/CameraGrid.svelte';

    export let data
</script>

<CameraGrid cameras={ data.cameras } />