<script lang="ts">
    import InmateList from '$lib/InmateList.svelte';

    export let data

</script>

<InmateList inmates={data.inmates} />