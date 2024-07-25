import {error} from "@sveltejs/kit";

const STATIONS_URL = new URL("/stations", import.meta.env.VITE_BACKEND_ADDRESS).href

export async function load({ fetch }) {
    let response;
    try {
        response = await fetch(STATIONS_URL)
    } catch {
        error(503, "Serwer nie odpowiada")
    }
    const content = await response.json()
    let reports: Map<string, Map<string, any[]>> = new Map();
    for (const station of content) {
        reports.set(station.id, new Map());
        for (const sensor of station.sensors) {
            const reportUrl = new URL(`/stations/${station.id}/sensors/${sensor.id}/reports`, import.meta.env.VITE_BACKEND_ADDRESS).href
            const response = await fetch(reportUrl)
            const sensorReports = await response.json();
            reports.get(station.id)?.set(sensor.id, sensorReports);
        }
    }
    return {stations: content, reports: reports};
}
