import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('timer-view')
export class TimerView extends LitElement {

    @property({ type: Number }) duration = 2 * 60 * 60; // Default 2 hours
    @state() private remaining = 0;
    @state() private running = false;
    @state() private startTime!: Date;

    private tag = '';
    private color = '#cccccc'; // default color

    private intervalId?: number;

    connectedCallback() {
        super.connectedCallback();
        this.remaining = this.duration;
    }

    private tick() {
        if (this.remaining > 0) {
            this.remaining--;
            this.requestUpdate();
        } else {
            this.stopTimer();
        }
    }

    private startTimer() {
        if (this.running) return;
        this.remaining = this.duration;
        this.running = true;
        this.startTime = new Date();
        this.intervalId = window.setInterval(() => this.tick(), 1000);
    }
    

    private async stopTimer() {
        if (!this.running) return; // Prevent action if timer is not running
        this.running = false;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.requestUpdate();
        
        await fetch('http://localhost:3001/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            startTime: this.startTime ? this.startTime.toISOString() : new Date().toISOString(),
            endTime: new Date().toISOString(),
            durationSec: this.duration - this.remaining,
            tag: this.tag,
            color: this.color
        }),
        });



        // TODO: Save the finished session to backend
    }

    private formatTime() {
        const h = Math.floor(this.remaining / 3600);
        const m = Math.floor((this.remaining % 3600) / 60);
        const s = this.remaining % 60;
        return `${h.toString().padStart(2, '0')}:${m
            .toString()
            .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    static styles = css`
        .timer {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
        }

        .clock {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 6px solid #333;
            position: relative;
            background: #fafafa;
        }

                .clock-number {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 14px;
        transform: translate(-50%, -50%);
        }

        .hand {
            position: absolute;
            width: 3px;
            height: 70px;
            background: red;
            top: 30px;
            left: 50%;
            transform-origin: bottom center;
            transition: transform 1s linear;
        }

        .marker {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center center; /* Rotate around center */
        }

        .center-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: black;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }

        .buttons {
            display: flex;
            gap: 1rem;
        }

        .marker.minute {
        width: 2px;
        height: 6px;
        background: #999;
        }

        .marker.hour {
        width: 3px;
        height: 12px;
        background: #333;
        }
    `;


    render() {
        const angle = (360 * (this.duration - this.remaining)) / this.duration;
            return html`
                <div class="timer">
                <div class="clock">
                    <!-- Minute markers (every 6 degrees) -->
                    ${Array.from({ length: 60 }).map((_, i) => {
                    const deg = i * 6;
                    const isHour = i % 5 === 0;
                    return html`
                        <div
                        class="marker ${isHour ? 'hour' : 'minute'}"
                        style="transform: rotate(${deg}deg) translateY(-95px);"
                        ></div>
                    `;
                    })}

                    <!-- Clock hand -->
                    <div class="hand" style="transform: rotate(${angle}deg);"></div>
                    <div class="center-dot"></div>
                </div>

                <h2>${this.formatTime()}</h2>
                <div class="buttons">
                    <button @click=${this.startTimer}>Start</button>
                    <button @click=${this.stopTimer}>Stop</button>
                </div>
                <input type="text" placeholder="Tag (e.g. coding)" @input=${(e: { target: { value: string; }; }) => this.tag = e.target.value} />
                <input type="color" @input=${(e: { target: { value: string; }; }) => this.color = e.target.value} />

                </div>
            `;1
    }

}
