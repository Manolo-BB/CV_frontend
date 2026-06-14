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

        <div>
            <div v-for="project in filteredProjects" :key="project.id"
                class="bg-backgroundComp shadow-md rounded-lg m-auto mb-6 p-6 transition-all duration-300 w-4/5 rootComp flex flex-col md:flex-row">

                <div class="flex-[2] flex flex-col justify-between">
                    <div>
                        <h2 class="text-2xl font-bold mb-2 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between">
                            <span>{{ project.title }}</span>
                            <span v-if="project.date" class="text-sm font-normal text-gray-500 mt-1 md:mt-0 italic">
                                {{ project.date }}
                            </span>
                        </h2>

                        <p class="text-gray-700 mb-4 font-medium">{{ project.shortDescription }}</p>

                        <div v-if="!project.showDetails && project.details" class="text-gray-600 border-l-4 border-gray-300 pl-4 italic text-sm mb-4">
                            <p>{{ getMarkdownSnippet(project.details) }}...</p>
                        </div>

                        <div class="mt-4 flex flex-wrap gap-3 justify-center md:justify-start items-center">
                            <img v-for="(image, imgIndex) in project.detailImages" :key="imgIndex" :src="image" alt="Detail"
                                class="w-12 h-12 rounded-lg shadow-sm bg-white p-1 object-contain" />
                        </div>
                    </div>

                    <div class="flex justify-center md:justify-start mt-6">
                        <button @click="toggleDetails(project)" class="text-blue-500 hover:underline font-semibold flex items-center gap-1">
                            <span>{{ project.showDetails ? "Cacher les détails" : "Lire la suite des détails" }}</span>
                            <span>{{ project.showDetails ? "↑" : "↓" }}</span>
                        </button>
                    </div>

                    <div v-show="project.showDetails" class="mt-4 flex flex-col text-left">
                        <hr class="border-gray-200 my-4" />
                        <div v-if="project.details" v-html="markdownToHtml(project.details)" class="prose max-w-none"></div>

                        <div v-if="project.extraContent" class="mt-4">
                            <img v-if="project.extraContent.image" :src="project.extraContent.image" alt="Extra Content"
                                class="rounded-lg shadow-md mx-auto my-4" />

                            <div v-if="project.extraContent.links" class="mt-4">
                                <p class="text-gray-800 font-semibold">Links:</p>
                                <ul>
                                    <li v-for="(link, index) in project.extraContent.links" :key="index">
                                        <a :href="link" target="_blank" class="text-blue-500 hover:underline">{{ link }}</a>
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

                    <div v-if="project.card.video" class="fixed-height w-full flex justify-center items-center overflow-hidden rounded-lg shadow-md bg-backgroundComp">
                        <video :src="project.card.video" autoplay loop muted playsinline class="w-full h-full object-cover">
                        </video>
                    </div>

                    <Card3DComponent v-else :image="project.card.image" :description="project.card.description" class="fixed-height" />

                    <div class="flex justify-center mt-4 w-full">
                        <a v-if="typeof project.github === 'string'" :href="project.github" target="_blank"
                            class="flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition w-full max-w-[200px]">
                            <img src="/images/projets/github.png" alt="GitHub" class="w-fit h-5 mr-2" />
                            <span>GitHub</span>
                        </a>

                        <div v-else-if="Array.isArray(project.github)" class="flex flex-col space-y-2 w-full max-w-[200px]">
                            <a v-for="(link, index) in project.github" :key="index" :href="link" target="_blank"
                                class="flex items-center justify-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition w-full">
                                <img src="/images/projets/github.png" alt="GitHub" class="w-fit h-5 mr-2" />
                                <span>GitHub {{ index + 1 }}</span>
                            </a>
                        </div>

                        <p v-else class="text-gray-500 italic text-sm text-center">Pas de lien Github disponible</p>
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
      projects: projectsData.projects.map(project => ({
    ...project,
    showDetails: false
}))
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
    },
    methods: {
        filterByTechnology(tech) {
          this.projects.forEach(project => {
              project.showDetails = false;
          });
          this.selectedTechnology = tech;
        },
        clearFilter() {
            this.projects.forEach(project => {
                project.showDetails = false;
            });
            this.selectedTechnology = null;
        },
        toggleDetails(projectToToggle) {
            const shouldOpen = !projectToToggle.showDetails;
            this.projects.forEach(project => {
                project.showDetails = false;
            });
            projectToToggle.showDetails = shouldOpen;
        },
        markdownToHtml(details) {
            marked.setOptions({
                gfm: true,
                breaks: true
            });
            return marked(details);
        },
        // NETTOYAGE DU MARKDOWN POUR L'EXTRAIT DE TEXTE
        getMarkdownSnippet(markdownText) {
            if (!markdownText) return '';
            // Supprime les syntaxes Markdown courantes (*, **, #, `) pour avoir du texte brut propre
            const cleanText = markdownText
                .replace(/[#*`_\-]/g, '') // Enlève les caractères gras, italiques, titres
                .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Garde uniquement le texte des liens
                .trim();

            // Prend les 140 premiers caractères pour l'extrait
            return cleanText.slice(0, 140);
        }
    },
};
</script>

<style scoped>
:deep(.prose) {
    text-align: justify;
}

/* Styles pour harmoniser le rendu du Markdown HTML généré */
:deep(.prose ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
:deep(.prose li) {
    margin-bottom: 0.25rem;
}
:deep(.prose p) {
    margin-bottom: 0.75rem;
}

.fixed-height {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

@media (max-width: 768px) {
    .rootComp {
        width: 100%;
    }
}
</style>
