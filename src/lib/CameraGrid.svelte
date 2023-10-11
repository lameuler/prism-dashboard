<script lang="ts">
    import Section from './Section.svelte';

    export let seeAll: string = ""
    export let refresh: (() => any) | undefined = undefined
</script>
<Section heading="Security Cameras" {seeAll} {refresh}>

</Section>