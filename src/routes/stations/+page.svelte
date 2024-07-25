<script lang="ts">
    import Station from "$lib/components/Station.svelte";
    import type {StationProps} from "$lib/types";

    export let data: {stations: StationProps[], reports: Map<string, Map<string, any[]>>};
</script>

<svelte:head>
    <title>Czujniki</title>
</svelte:head>

<section>
    <h1>Stacje pogodowe</h1>
    {#each data.stations as station}
        <Station data={station} reports={data.reports.get(station.id)} />
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }
</style>
