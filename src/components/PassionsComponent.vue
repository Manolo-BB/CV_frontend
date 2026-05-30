<template>
    <div class="flex flex-col items-center min-h-screen bg-background p-6">
        <h1 class="text-4xl font-bold mb-6 text-center">Plus personnellement</h1>
        <p class="text-lg text-gray-700 mb-8 w-3/4 text-center">
            Au dela d'un informaticien, je suis aussi un humain avec diverses passions, auxquelles je m'adonne sur le
            temps libre.
            Je fais beaucoup de musique, de sport, et apprécie aller explorer un coin de nature.
        </p>

        <div class="w-4/5 relative mb-4">
            <div class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${activeIndex * (imageWidth + translationOffset)}%)` }">
                <div v-for="(image, index) in images" :key="index"
                    :style="{ width: `${imageWidth}%`, transform: getImageTransform(index), opacity: getImageOpacity(index) }"
                    class="transition-all duration-500 ease-in-out">
                    <img :src="image" @mouseenter="setCarousselIndex(index)" alt="Project Image"
                        class="w-full h-64 object-cover rounded-lg shadow-md" />
                </div>
            </div>

        </div>

        <div v-for="( project, index ) in  passions " :key="index"
    class="w-3/4 holder border-b last:no-border bg-backgroundComp last:rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-2">{{ project.title }}</h2>

    <div class="flex flex-col md:flex-row items-center">
        <p class="text-gray-700 mb-4 md:mb-0 flex-1">{{ project.description }}</p>
        <div class="w-full md:w-1/2">
            <Card3DComponent :image="project.card.image" :description="project.card.description" />
        </div>
    </div>
    <div v-if="project.imageList" class="mt-4">
        <CarousselComponent :images="project.imageList" />
    </div>
</div>
    </div>
</template>

<script>
import Card3DComponent from "@/widgets/Card3DComponent.vue";
import SoundPlayer from "@/widgets/SoundPlayerComponent.vue";
import CarousselComponent from "@/widgets/CarousselComponent.vue";
import Passions from "@/data/PassionsData.json";

export default {
    name: "PassionsComponent",
    components: {
        SoundPlayer,
        Card3DComponent,
        CarousselComponent,
    },
    data() {
        return {
            images: [
                "/images/passions/chartreuse1.jpg",
                "/images/passions/moucherotte1.jpg",
                "/images/passions/skipunk.png",
                "/images/passions/topin.png",
                "/images/passions/gazolineMarius.jpg",
            ],
            activeIndex: 1,
            passions: Passions.passions
        };
    },
    computed: {
        computed: {
            imageWidth() {
                return 1000;
            },

            translationOffset() {
                return (100 - this.imageWidth) / 2;
            },
            width() {
                return this.imageWidth / this.images.length;
            },
        },
    },
    methods: {
        prevSlide() {
            this.activeIndex =
                (this.activeIndex - 1 + this.images.length) % this.images.length;
        },
        nextSlide() {
            this.activeIndex = (this.activeIndex + 1) % this.images.length;
        },
        setCarousselIndex(index) {
            this.activeIndex = index;
        },
        getImageClass(index) {
            const offset = index - this.activeIndex;

            if (offset === 0) {
                return "z-10 scale-100 opacity-100";
            } else if (offset === -1 || offset === this.images.length - 1) {
                return "z-5 scale-90 opacity-80";
            } else if (offset === 1 || offset === -(this.images.length - 1)) {
                return "z-5 scale-90 opacity-80";
            } else {
                return "z-0 scale-75 opacity-0";
            }
        },
        getImageTransform(index) {
            const offset = index - this.activeIndex;
            if (offset === 0) {
                return 'scale(1)';
            } else if (Math.abs(offset) === 1) {
                return 'scale(0.7)';
            } else {
                return 'scale(0.5)';
            }
        },
        getImageOpacity(index) {
            const offset = index - this.activeIndex;
            if (offset === 0) {
                return 1;
            } else if (Math.abs(offset) === 1) {
                return 0.7;
            } else {
                return 0.5;
            }
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

.flex {
    perspective: 1000px;
    /* Enables 3D effect */
}

button.text-blue-500 {
    display: block;
    margin: 12 auto;
    margin-top: 16px;
}

button.text-blue-500:hover {
    color: #2563eb;
    text-decoration: underline;
}

.bg-white {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.bg-white .p-6 {
    padding: 24px;
}

@media (min-width: 768px) {
    .bg-white {
        flex-direction: row;
    }
}
@media (max-width: 768px) {
    .holder {
        width:100%;
    }
}
</style>