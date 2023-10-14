<script lang="ts">
    export let uri: string
    export let id: string
</script>

<a href="/cameras/{id}">
    <video class="rounded-lg" src={uri} muted loop autoplay></video>
</a>