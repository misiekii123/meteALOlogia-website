<script lang="ts">
    import Sensor from "$lib/components/Sensor.svelte";
    import type {StationProps} from "$lib/types";

    export let data: StationProps;
    export let reports: Map<string, any[]> | undefined;
</script>

<div>
    <p>{data.name}</p>
    <p>Czujniki:</p>
    {#each data.sensors as sensor}
        <Sensor data={sensor} station={data.id} reports={reports?.get(sensor.id)}/>
    {/each}
</div>

<style>
    div {
        border: solid;
        width: 50%;
        text-align: center;
        margin: 10px;
    }
</style>