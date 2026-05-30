<template>
    <div class="flex flex-col items-center min-h-screen bg-background p-4 ">

        <div class="bg-backgroundComp shadow-md rounded-lg p-4 w-4/5 m-auto mb-6 rootComp">
            <h3 class="text-lg font-bold mb-4">Trier par technologies :</h3>
            <div class="flex gap-4 flex-wrap">
                <button v-for="(tech, index) in uniqueTechnologies" :key="index" @click="filterByTechnology(tech)"
                    :class="{
                    'bg-primaryButton text-white': selectedTechnology === tech,
                    'bg-gray-200 text-gray-700': selectedTechnology !== tech
                }" class="px-4 py-2 rounded-lg shadow-md hover:bg-secondaryButton transition">
                    {{ tech }}
                </button>
                <button @click="clearFilter"
                    class="bg-primaryButton text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondaryButton transition">
                    Toutes
                </button>
            </div>
        </div>

        <div class="">
            <div v-for="(project, index) in   filteredProjects  " :key="index"
                class="bg-backgroundComp shadow-md rounded-lg  m-auto mb-6 p-6 transition-all duration-300 w-4/5 rootComp flex flex-col md:flex-row"
                :class="{ 'h-auto': project.showDetails, 'h-auto': !project.showDetails }">

                <div class="flex-[2]">
                    <h2 class="text-2xl font-bold mb-4 text-center">{{ project.title }}</h2>
                    <p class="text-gray-700 mb-4 text-center">{{ project.shortDescription }}</p>
                    <div class="mt-4 flex flex-wrap gap-4 justify-center items-center">
                        <img v-for="(image, imgIndex) in project.detailImages" :key="imgIndex" :src="image" alt="Detail"
                            class="w-20 h-20 rounded-lg shadow-md" />
                    </div>
                    <div class="flex justify-center mt-4">
                        <button @click="toggleDetails(index)" class="text-blue-500 hover:underline">
                            {{ project.showDetails ? "Cacher les détails" : "Afficher les détails" }}
                        </button>
                    </div>
                    <div v-show="project.showDetails"
                        class="mt-4 flex justify-center items-center flex-col text-center">
                        <div v-if="project.details" v-html="markdownToHtml(project.details)"></div>

                        <div v-if="project.extraContent" class="mt-4">
                            <img v-if="project.extraContent.image" :src="project.extraContent.image" alt="Extra Content"
                                class="rounded-lg shadow-md" />



                            <div v-if="project.extraContent.links" class="mt-4">
                                <p class="text-gray-800 font-semibold">Links:</p>
                                <ul>
                                    <li v-for="(link, index) in project.extraContent.links" :key="index">
                                        <a :href="link" target="_blank" class="text-blue-500 hover:underline">{{ link
                                            }}</a>
                                    </li>
                                </ul>
                            </div>

                            <SoundPlayer v-if="project.extraContent.soundDry" :src="project.extraContent.soundDry"
                                :inputDry="project.extraContent.soundDry" :inputWet="project.extraContent.soundWet"
                                :label="project.extraContent.label" />

                        </div>
                    </div>
                </div>
                <div class="flex-[1] flex flex-col justify-center items-center mt-6 md:mt-0 md:ml-6">
                    <!-- Card Component -->
                    <Card3DComponent :image="project.card.image" :description="project.card.description"
                        class="fixed-height" />

                    <!-- Button Container -->
                    <div class="flex justify-center mt-4">
                        <a v-if="typeof project.github === 'string'" :href="project.github" target="_blank"
                            class="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition">
                            <img src="/images/projets/github.png" alt="GitHub" class="w-fit h-5 mr-2" />
                            <span>GitHub</span>
                        </a>

                        <div v-else-if="Array.isArray(project.github)" class="flex flex-col space-y-2">
                            <a v-for="(link, index) in project.github" :key="index" :href="link" target="_blank"
                                class="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition">
                                <img src="/images/projets/github.png" alt="GitHub" class="w-fit h-5 mr-2" />
                                <span>GitHub {{ index + 1 }}</span>
                            </a>
                        </div>

                        <p v-else class="text-gray-500 italic">Pas de lien Github disponible</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Card3DComponent from "@/widgets/Card3DComponent.vue";
import SoundPlayer from "@/widgets/SoundPlayerComponent.vue";
import projectsData from "@/data/ProjectsData.json";
import { marked } from 'marked';

export default {
    name: "ProjectsComponent",
    components: {
        SoundPlayer,
        Card3DComponent,
    },
    data() {
        return {
            selectedTechnology: null,
            projects: projectsData.projects,
            markdown: "",
        };
    },
    computed: {
        uniqueTechnologies() {
            const techSet = new Set();
            this.projects.forEach((project) => {
                project.technologies.forEach((tech) => techSet.add(tech));
            });
            return Array.from(techSet);
        },
        filteredProjects() {
            if (!this.selectedTechnology) {
                return this.projects;
            }
            return this.projects.filter((project) =>
                project.technologies.includes(this.selectedTechnology)
            );
        },
        markdownToHtml() {
            return (details) => {
        
                this.markdown = details;
                
                // Convert markdown to HTML
                marked.setOptions({
                    gfm: true,
                    breaks: true,
                    sanitize: true,
                });
                return marked(details);
            }
        },
    },
    methods: {
        filterByTechnology(tech) {
            this.selectedTechnology = tech;
        },
        clearFilter() {
            this.selectedTechnology = null;
        },
        toggleDetails(index) {
            this.projects[index].showDetails = !this.projects[index].showDetails;
        },
        toggleDetails(index) {
            this.projects[index].showDetails = !this.projects[index].showDetails;
        },
    },
};
</script>

<style scoped>
.flex-1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.flex-1 .flex.justify-center.mt-6 {
    margin-top: 16px;
    margin-bottom: auto;

}

button.text-blue-500 {
    display: block;
    margin: 12 auto;
    margin-top: 16px;
}



.bg-white {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.bg-white .p-6 {
    padding: 24px;
}

.fixed-height {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

@media (min-width: 768px) {
    .bg-white {
        flex-direction: row;
    }
  

}
@media (max-width: 768px) {
    .rootComp{
        width: 100%;
    }
}
</style>