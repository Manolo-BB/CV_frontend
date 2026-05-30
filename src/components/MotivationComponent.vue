<template>
    <div class="flex justify-center items-start min-h-screen bg-background">
        <div class="bg-backgroundComp shadow-md rounded-lg p-6 transition-all duration-300 listItems w-4/5">
            <!-- Title -->
            <h1 class="text-3xl font-bold mb-4 text-center text-textPrimary">Lettre de motivation</h1>

            <!-- Short Description -->
            <p class="text-lg text-gray-700 mb-6 text-left text-textSecondary">
                Chers membres de Code Lutin,
            </p>

            <!-- Video Section -->
            <div class="flex justify-center mb-6">
                <video class="rounded-lg shadow-md" controls width="640" height="360">
                    <source :src="videoLink" type="video/mp4" />
                </video>
            </div>

            <!-- Long Motivational Text -->
            <div class=" text-textSecondary">
                <p class="mb-4">
                    Je vous adresse cette lettre afin de vous faire part de ma motivation à rejoindre votre équipe, dont l’approche m’inspire depuis longtemps. Ce que vous défendez – l’égalité, le partage, la démocratie dans le travail – ce sont aussi mes repères. En découvrant le collectif Libre Entreprise, j’ai eu le sentiment de découvrir quelque chose de rare et cohérent. Je veux faire partie d’un environnement comme celui-là.
                </p>

                <p class="mb-4">

                    Mon parcours s’est construit en grande partie grâce aux logiciels libres. Cet univers m’a permis de progresser rapidement, en autonomie, tout en accédant à des connaissances précieuses. Dans le même esprit de partage, je rends publics mes projets personnels afin que d’autres puissent s’en inspirer ou les faire évoluer. J’aime également explorer des terrains techniques variés, comme en témoigne mon projet actuel autour d’une architecture de plugins audio en C++, pensé pour être libre, évolutif et utile à d’autres développeurs.                </p>

                <p class="mb-4">

                    Ces dernières années, j’ai conçu et administré plusieurs sites web, notamment pour l’association L’Agrafe, un projet personnel, ainsi que mon CV en ligne. J’ai utilisé Vue.js, mon framework frontend de prédilection, que je trouve particulièrement intuitif et agréable à manipuler. En parallèle, j’ai développé des backends avec ExpressJS et Spring Boot, ce qui m’a permis d’avoir une comprehension complète de l’architecture web, du front jusqu’au serveur. Ces expériences m’ont apporté une vraie polyvalence ainsi qu’une autonomie technique que j’ai plaisir à mettre au service de projets collectifs.                </p>

                <p class="mb-4">
                    Ce que je recherche dans mon travail, c’est un cadre bienveillant et respectueux, où l’on peut grandir, s’exprimer, apprendre au contact des autres, et surtout, construire ensemble. J’aime l’intelligence collective, l’échange d’idées, et je crois profondément que la diversité des points de vue est indispensable à l’émergence des meilleures solutions. Les valeurs démocratiques que vous défendez me semblent garantir un cadre serein, propice à l’épanouissement de chacun et à l’efficacité du groupe.                </p>

                <p class="mb-4">
                    Sur le plan personnel, je suis rigoureux, curieux, autonome dans mes apprentissages, et toujours volontaire pour avancer et aider. Mon esprit critique, mon goût pour la création (nourri notamment par la musique), et mon énergie font de moi un moteur dans les projets d’équipe.                </p>

                <p class="mb-4">
                    Actuellement en poste à Grenoble, je souhaiterais revenir à Nantes afin de retrouver un cadre professionnel plus en adéquation avec mes aspirations. Je suis flexible sur la date d’embauche et disponible pour un entretien à distance, j'aimerais aussi me déplacer afin de pouvoir vous rencontrer en présentiel.                </p>

                <p class="mb-4">
                    Je serais heureux de pouvoir échanger avec vous et, je l’espère, de contribuer à l’aventure Code Lutin. Merci pour l’attention portée à ma démarche.                </p>

                <p class="mb-4">
                    Bien à vous,
                </p>
                <p class="mb-4">
                    <strong>Marius Boucard Bocciarelli</strong>
                </p>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "MotivationComponent",
    data() {
        return {
            videoLink:  import.meta.env.VITE_APP_BACKEND_URL +"/api/video?name=cv.mp4", 
            backendAvailable: false,
        };
    },
    methods: {

    },
    mounted() {

    axios.get(import.meta.env.VITE_APP_BACKEND_URL +'/health')
        .then(response => {
console.log(response.data);
            if (response.status === 200) {
                this.backendAvailable = true;
            } else {
                this.backendAvailable = false;
            }
        })
        .catch(error => {
        });
},

};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>