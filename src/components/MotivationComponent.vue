<template>
    <div class="flex justify-center items-start min-h-screen bg-background">
        <div class="bg-backgroundComp shadow-md rounded-lg p-6 transition-all duration-300 listItems w-4/5">

            <h1 class="text-3xl font-bold mb-4 text-center text-textPrimary">
                {{ motivationData.title }}
            </h1>

            <p class="text-lg mb-6 text-left text-textSecondary">
                {{ motivationData.greeting }}
            </p>

            <div v-if="motivationData.video" class="flex justify-center mb-6">
                <video class="rounded-lg shadow-md" controls width="640" height="360">
                    <source :src="videoLink" type="video/mp4" />
                </video>
            </div>

            <div class="text-textSecondary justified">
                <p
                    v-for="(paragraph, index) in motivationData.paragraphs"
                    :key="index"
                    class="mb-4"
                >
                    {{ paragraph }}
                </p>

                <p class="mb-4">Bien à vous,</p>

                <p class="mb-4">
                    <strong>{{ motivationData.signature }}</strong>
                </p>
            </div>

        </div>
    </div>
</template>
<style scoped>
.justified {
    text-align: justify;
    hyphens: auto;
}
</style>
<script>
import axios from "axios";
import motivationData from "../data/MotivationData.json";

export default {
    name: "MotivationComponent",

    data() {
        return {
            backendAvailable: false,
            motivationData
        };
    },

    computed: {
        videoLink() {
            return `${import.meta.env.VITE_APP_BACKEND_URL}/api/video?name=${this.motivationData.video}`;
        }
    },

    mounted() {
        axios
            .get(`${import.meta.env.VITE_APP_BACKEND_URL}/health`)
            .then(response => {
                this.backendAvailable = response.status === 200;
            })
            .catch(() => {
                this.backendAvailable = false;
            });
    }
};
</script>
