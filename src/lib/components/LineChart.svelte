<script lang="ts">
    import type { SensorProps, SensorReport } from "$lib/types";
    import { onMount } from "svelte";
    import Chart from 'chart.js/auto';
    import 'chartjs-adapter-date-fns';


    export let value: string;
    export let reports: SensorReport[];
    export let range: {min: number, max: number};
    export let dataType: string[];
    export let fill: boolean;
    export let legend: boolean;

    let chartCanvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;
    let chart: Chart | null = null;
    let gradient: CanvasGradient;
    let datasets: any[] = [];

    const now = Date.now()
    const monthBefore = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
    ).getTime()
    Chart.defaults.color = "#fff";
    $: {
        if (ctx === null) break $;

        datasets = [];

        gradient = ctx.createLinearGradient(0, 0, 0, chartCanvas.height);
        gradient.addColorStop(0, 'rgba(255, 181, 48, 1)');
        gradient.addColorStop(1, 'rgba(255, 181, 48, 0)');

        if (dataType.length > 1) {
            let colors: any[] = ['#ffa300', '#ffc851', '#ffe0b0'];
            for (let i = 0; i < dataType.length; i++) {
                const formattedReports = reports.map(report => ({
                    x: new Date(report.timestamp).getTime(),
                    y: report.data[dataType[i]]
                }));
                datasets.push({
                    label: dataType[i],
                    data: formattedReports,
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    borderWidth: 6,
                    pointBorderWidth: 4,
                    fill: fill,
                });
            }
        }
        else {
            const formattedReports = reports.map(report => ({
                x: new Date(report.timestamp).getTime(),
                y: report.data[dataType[0]]
            }));
            datasets.push({
                label: value,
                data: formattedReports,
                backgroundColor: gradient,
                borderColor: '#ffb530',
                borderWidth: 6,
                pointBorderWidth: 4,
                fill: fill,
            });
        }

        if (chart !== null) { chart.destroy() }
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: datasets
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'dd.MM'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Data'
                        },
                        max: now,
                        min: monthBefore,
                        grid: {
                            color: '#fff'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: value
                        },
                        min: range.min,
                        max: range.max,
                        grid: {
                            color: '#fff'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: legend
                    }
                }
            }
        });
    }
    onMount(() => {
        ctx = chartCanvas.getContext("2d") as CanvasRenderingContext2D;
    })

</script>

<canvas bind:this={chartCanvas} id="sensorChart"></canvas>