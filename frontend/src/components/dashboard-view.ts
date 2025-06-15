import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import Chart from 'chart.js/auto';

@customElement('dashboard-view')
export class DashboardView extends LitElement {
    static styles = css`
    canvas {
      max-width: 100%;
      height: auto;
    }
  `;

    chart: Chart | null = null;

    firstUpdated() {
        this.fetchDataAndRender();
    }

    async fetchDataAndRender() {
        const res = await fetch('http://localhost:3001/api/sessions/summary?days=7');
        const data = await res.json();
        console.log('Fetched data:', data);

        const ctx = this.renderRoot.querySelector('canvas')!;
        const labels = data.map((d: any) => d.date);
        const durations = data.map((d: any) => d.totalHours);

        const backgroundColors = data.map((d: any) => {
            if (d.sessions.length === 1 && d.sessions[0].color) {
                return d.sessions[0].color;
            }
            return '#8884d8'; // default
        });

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Hours per day',
                    data: durations,
                    backgroundColor: backgroundColors,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Hours' }
                    },
                    x: {
                        title: { display: true, text: 'Date' }
                    }
                }
            }
        });
    }

    render() {
        return html`<canvas></canvas>`;
    }
}
