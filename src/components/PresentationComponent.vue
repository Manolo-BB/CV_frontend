<template>
    <div class="flex justify-center items-start min-h-screen bg-background">
        <div class="bg-backgroundComp shadow-md rounded-lg p-6 transition-all duration-300 listItems"
            :class="activeIndex !== null ? 'w-4/5 md:w-3/4' : 'w-3/5 md:w-2/3 lg:w-1/2'">
            <h1 class="text-4xl font-extrabold mb-6 text-center text-gray-800">
                {{ title }}
            </h1>

            <p class="text-lg text-center text-gray-600 mb-6">
                {{ description }}
            </p>
            <div class="flex justify-end">
                <button @click="fetchPdf"
                    class="bg-primaryButton hover:bg-secondaryButton text-white font-bold py-2 px-4 mb-4 rounded">
                    CV pdf
                </button>
            </div>

            <div class="w-3/4 flex justify-center  mx-auto mb-6">
                <img src="@/assets/images/sst.png" alt="CV Image" class="rounded-lg shadow-md w-20 h-20 mr-10" />
                <p class="m-auto text-gray-600 mb-6">
                    Nous avons eu la chance de suivre la formation SST (Sauveteur Secouriste du Travail) sur la base du
                    volontariat en février 2025, en plus d'une formation aux risques incendie."
                </p>
            </div>

            <!-- Video -->
            <div class="flex justify-center mb-6">
                <video v-if="videoLink && backendAvailable" controls class="rounded-lg shadow-md w-3/5">
                    <source :src="videoLink" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">
                {{ titleInfo }}
            </h2>
            <p class="text-base text-center text-gray-600">
                {{ additionnalInformations }}
            </p>
            <ul class="cvList bg-listPrimary rounded-lg">
                <li v-for="(experience, index) in experiences" :key="index" class="mb-6 border-b pb-6 rounded-lg ">
                    <div class="flex flex-col md:flex-row items-center gap-6 cursor-pointer"
                        @click="toggleDetails(index)">
                        <!-- Image Section -->
                        <div
                            class="flex-shrink-0 h-15 w-40 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                            <img :src="experience.technologyImage" alt="Technology" class="h-4/5 object-cover" />
                        </div>

                        <!-- Content Section -->
                        <div class="flex flex-col md:flex-row items-center flex-grow w-full">
                            <!-- Title and Job Section -->
                            <div class="flex flex-col flex-grow text-center md:text-left">
                                <h2 class="text-lg font-bold text-gray-800 truncate">
                                    {{ experience.compagnyName }}
                                </h2>
                                <p class="text-sm text-gray-600 mt-2">
                                    {{ experience.job }}
                                </p>
                            </div>

                            <!-- Year and Arrow Section -->
                            <div
                                class="flex flex-col items-center md:items-end text-sm text-gray-500 w-full md:w-32 mt-4 md:mt-0">
                                <span class="text-gray-500 transform transition-transform"
                                    :class="{ 'rotate-180': activeIndex === index }">
                                    ▼
                                </span>
                                <span class="mt-1">{{ experience.yearBegin }} - {{ experience.yearEnd }}</span>
                            </div>
                        </div>
                    </div>

                    <div v-show="activeIndex === index" class="mt-4 p-6 bg-listSecondary rounded-lg shadow-md">
                        <h2 class="text-2xl font-bold text-textPrimary text-center mb-4">
                            {{ experience.detailsTitle }}
                        </h2>
                        <div v-if="experience.details" v-html="markdownToHtml(experience.details)"></div>



                        <div class="flex flex-col md:flex-row items-center gap-6">
                            <div v-if="experience.image" class="w-full md:w-1/2">
                                <Card3DComponent class="w-full" :image="experience.image"
                                    :description="experience.description" />
                            </div>

                            <div v-if="experience.pictureDescription" class="w-full md:w-1/2"
                                v-html="markdownToHtml(experience.pictureDescription)"></div>
                        </div>


                        <div class="mt-6 flex flex-wrap gap-4 justify-center">
                            <img v-for="(image, imgIndex) in experience.detailImages" :key="imgIndex" :src="image"
                                alt="Detail" class="w-20 h-20 rounded-lg shadow-md object-cover" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Cv from "@/data/CvData.json";
import Card3DComponent from "@/widgets/Card3DComponent.vue";
import { marked } from "marked";

export default {
    name: "PresentationComponent",
    components: {
        Card3DComponent,
    },

    data() {
        return {
            markdown: "",
            experiences: Cv.Cv,
            description: Cv.description,
            videoLink: import.meta.env.VITE_APP_BACKEND_URL + "/api/video?name=cv.mp4",
            title: Cv.title,
            activeIndex: null,
            additionnalInformations: Cv.additionnalInformations,
            titleInfo: Cv.titleInfo,
            backendAvailable: false
        }
    },
    methods: {
        async checkBackend() {
            try {
                const response = await fetch(this.meta.env.VITE_APP_BACKEND_URL + "/health");
                if (response.ok) {
                    this.backendAvailable = true;
                } else {
                    this.backendAvailable = false;
                }
            } catch (error) {
                this.backendAvailable = false;
            }
        },
        toggleDetails(index) {
            this.activeIndex = this.activeIndex === index ? null : index;

        },
        markdownToHtml(details) {


            marked.setOptions({
                gfm: true,
                breaks: true,
                sanitize: true,
            });
            return marked(details);
        },
        async fetchPdf() {
            try {
                const response = await fetch(this.meta.env.VITE_APP_BACKEND_URL + "/api/cvPDF", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/pdf",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch PDF");
                }

                const blob = await response.blob();

                const url = window.URL.createObjectURL(blob);
                window.open(url, "_blank");
            } catch (error) {
                console.error("Error fetching PDF:", error);
            }
        },
    },
    mounted() {
        this.checkBackend();
    },
};
</script>

<style scoped>
.cvList {
    margin-top: 20px;
}

.cvList li {
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}

.listItems {
    width: 80%;
}
</style>