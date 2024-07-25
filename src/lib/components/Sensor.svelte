<script lang="ts">
    import type {SensorProps} from "$lib/types";
    import {onMount} from "svelte";

    export let data: SensorProps;
    export let station: string;
    export let reports: any[] | undefined;
    // async function getReports() {
    //     const report_url = new URL(`/stations/${station}/sensors/${data.id}/reports`, import.meta.env.VITE_BACKEND_ADDRESS).href
    //     const response = await fetch(report_url)
    //     const reports = await response.json();
    //     return reports;
    // }
    //
    // onMount(async () => {
    //     reports = await getReports()
    // })

</script>

<div>
    <p>{data.name}</p>
    {#if reports === undefined}
        <p>Ładowanie...</p>
    {:else}
        <p>{JSON.stringify(reports)} ({data.type})</p>
    {/if}
</div>

<style>
    div {
        border: solid;
        width: 50%;
        text-align: center;
        margin: 10px;
    }
</style>
