<template>
    <div class="mt-4">
        <p class="text-gray-800 font-semibold label">{{ label }}</p>


        <div class="audio-knob" @mousedown="startKnobRotation" @touchstart="startKnobRotation">
            <div class="playhead" :style="{ transform: `rotate(${playheadAngle}deg)` }"></div>
        </div>
        <div class="track">
            <div class="progress" :style="{ width: `${progress}%` }"></div>
        </div>
        <p class="time">{{ formattedTime }}</p>
        <div class="button-group">
            <button :class="{ active: activeTrack === 'dry' }" @click="setActiveTrack('dry')">
                Dry
            </button>
            <button :class="{ active: activeTrack === 'wet' }" @click="setActiveTrack('wet')">
                Wet
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        inputDry: {
            type: String,
            required: true,
        },
        inputWet: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            audioDry: null,
            audioWet: null,
            activeTrack: "dry", // "dry" or "wet"
            isPlaying: false,
            playheadAngle: 0,
            progress: 0,
            currentTime: 0,
            duration: 0,
            intervalId: null,
            isRotating: false,
        };
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.currentTime / 60)
                .toString()
                .padStart(2, "0");
            const seconds = Math.floor(this.currentTime % 60)
                .toString()
                .padStart(2, "0");
            return `${minutes}:${seconds}`;
        },
    },
    methods: {
        setActiveTrack(track) {
            if (this.activeTrack === track) return;

            this.stopPlayback();
            this.activeTrack = track;
        },
        togglePlay() {
            this.$emit("stopOtherTracks");

            const audio = this.activeTrack === "dry" ? this.audioDry : this.audioWet;

            if (!audio) {
                this.initializeAudio();
            }

            if (this.isPlaying) {
                this.pauseAudio();
            } else {
                this.playAudio();
            }
        },
        initializeAudio() {
            if (!this.audioDry) {
                this.audioDry = new Audio( import.meta.env.VITE_APP_BACKEND_URL + this.inputDry);
            }
            if (!this.audioWet) {
                this.audioWet = new Audio( import.meta.env.VITE_APP_BACKEND_URL +this.inputWet);
            }
        },
        playAudio() {
            const audio = this.activeTrack === "dry" ? this.audioDry : this.audioWet;

            audio.play();
            this.isPlaying = true;
            this.duration = audio.duration || 1;

            this.intervalId = setInterval(() => {
                this.currentTime = audio.currentTime;
                this.progress = (this.currentTime / this.duration) * 100;
                this.playheadAngle = (this.currentTime / this.duration) * 360;

                if (this.currentTime >= this.duration) {
                    this.stopPlayback();
                }
            }, 100);
        },
        pauseAudio() {
            const audio = this.activeTrack === "dry" ? this.audioDry : this.audioWet;

            audio.pause();
            this.isPlaying = false;
            clearInterval(this.intervalId);
        },
        stopPlayback() {
            const audio = this.activeTrack === "dry" ? this.audioDry : this.audioWet;

            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            this.isPlaying = false;
            this.playheadAngle = 0;
            this.progress = 0;
            this.currentTime = 0;
            clearInterval(this.intervalId);
        },
        startKnobRotation(event) {
            this.isDragging = false;

            const knob = event.target.closest(".audio-knob");
            const rect = knob.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const moveHandler = (e) => {
                this.isDragging = true; // User is dragging
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI) + 90;
                const normalizedAngle = (angle + 360) % 360;

                this.playheadAngle = normalizedAngle;
                this.currentTime = (normalizedAngle / 360) * this.duration;
                this.progress = (this.currentTime / this.duration) * 100;

                const audio = this.activeTrack === "dry" ? this.audioDry : this.audioWet;
                if (audio) {
                    audio.currentTime = this.currentTime;
                }
            };

            const stopHandler = () => {
                if (!this.isDragging) {
                    this.togglePlay(); // Toggle play if it was a click
                }
                window.removeEventListener("mousemove", moveHandler);
                window.removeEventListener("mouseup", stopHandler);
                window.removeEventListener("touchmove", moveHandler);
                window.removeEventListener("touchend", stopHandler);
            };

            window.addEventListener("mousemove", moveHandler);
            window.addEventListener("mouseup", stopHandler);
            window.addEventListener("touchmove", moveHandler);
            window.addEventListener("touchend", stopHandler);
        },

    },
    watch: {
        isPlaying(newValue) {
            if (!newValue) {
                this.stopPlayback();
            }
        },
    },
};
</script>
<style scoped>
.label {
    font-size: 16px;
    color: #4b5563;
    margin-bottom: 10px;
    text-align: center;
}

.audio-knob {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(243, 244, 246, 0.2);
    /* Glassmorphism effect */
    border: 4px solid rgba(34, 197, 94, 0.6);
    /* Smooth green glow */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 0 15px rgba(34, 197, 94, 0.4);
    /* Shadow and glow */
    backdrop-filter: blur(10px);
    /* Glassmorphism blur */
    transition: all 0.3s ease;
    margin: auto;
}

.audio-knob:hover {
    background: rgba(229, 231, 235, 0.3);
    /* Slightly brighter background */
    border-color: rgba(34, 197, 94, 1);
    /* Stronger green glow */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 25px rgba(34, 197, 94, 0.8);
    /* Enhanced shadow and glow */
    transform: scale(1.1);
    /* Slight zoom effect */
}

.playhead {
    width: 4px;
    height: 40%;
    background: #1f2937;
    position: absolute;
    top: 10%;
    left: 50%;
    transform-origin: bottom center;
    transition: transform 0.1s linear;
}

.time {
    text-align: center;
    font-size: 14px;
    color: #4b5563;
    margin-top: 10px;
}

/* Styling for the button group */
.button-group {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: center;
}

/* Styling for the buttons */
.button-group button {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background-color: #4b5563;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.button-group button:hover {
    background-color: #374151;
    transform: scale(1.05);
}

.button-group button.active {
    background-color: #1f2937;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>