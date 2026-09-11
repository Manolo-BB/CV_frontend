<template>
    <div class="flex justify-center items-start min-h-screen bg-background">
        <div class="bg-backgroundComp shadow-md rounded-lg p-6 transition-all duration-300 listItems w-4/5">

            <h1 class="text-3xl font-bold mb-4 text-center text-textPrimary">
                {{ motivationData.title }}
            </h1>
            <div class="flex justify-center">
                <a :href="pdfLink" :download="pdfFileName"
                    class="bg-primaryButton hover:bg-secondaryButton text-white font-bold py-2 px-4 rounded text-center no-underline shadow-sm transition w-fit">
                    Télécharger la lettre (PDF)
                </a>
            </div>
            <p class="text-lg mb-6 text-left text-textSecondary">
                {{ motivationData.greeting }}
            </p>

           <div v-if="motivationData.video" class="flex justify-center mb-6">
              <iframe
                  width="640"
                  height="360"
                  :src="youtubeEmbedUrl"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="rounded-lg shadow-md"
              ></iframe>
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
import microchip from "@/data/Motivations/MicrochipData.json";
import kickmaker from "@/data/Motivations/KickMakerData.json";
import tronico from "@/data/Motivations/TronicoData.json";
import naonext from "@/data/Motivations/NaonextData.json";
import defaultLetter from "@/data/Motivations/default.json";

export default {
    name: "MotivationComponent",

    data() {
        return {
            currentCompany: "default",
            motivationData: defaultLetter
        };
    },
    methods: {
      loadLetter(company) {
          const letters = {
              microchip,
              kickmaker,
              tronico,
              naonext
          };

          this.motivationData =
              letters[company] ?? defaultLetter;
      }
    },
    computed: {
     youtubeEmbedUrl() {
      try {
          const id = new URL(this.motivationData.video)
              .searchParams.get("v");

          return `https://www.youtube.com/embed/${id}`;
          } catch {
              return "";
          }
      },
      pdfFileName() {
        console.log("motivationData :", this.motivationData);
        console.log("pdf :", this.motivationData.pdf);

        return this.motivationData.pdf;
      },
      pdfLink() {
              const link = `/motivations/${this.pdfFileName}`;
            console.log("Lien généré :", link);
          return link;
      }
    },
    mounted() {
        const companyFromUrl =
        this.$route.query.company?.toLowerCase();

        const company =
            companyFromUrl ||
            localStorage.getItem("company") ||
            "default";

        this.currentCompany = company;

        localStorage.setItem("company", company);

        this.loadLetter(company);
    }
  };

</script>
