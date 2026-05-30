<template>
    <div class="relative w-full  mx-auto">
        <!-- Carousel Container -->
        <div class="flex items-center justify-center overflow-hidden relative h-64">
            <div v-for="(image, index) in images" :key="index" class="absolute aspect-w-1 aspect-h-1 w-48 transition-transform duration-500"
                :style="getImageStyle(index)">
                <img :src="image" alt="Carousel Image" class="w-full h-full object-cover rounded-lg shadow-md" />
            </div>
        </div>

        <!-- Navigation Buttons -->
        <button
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
            @click="prevSlide">
            ‹
        </button>
        <button
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
            @click="nextSlide">
            ›
        </button>

        <!-- Dots -->
        <div class="flex justify-center mt-4">
            <span v-for="(image, index) in images" :key="index" class="w-3 h-3 mx-1 rounded-full cursor-pointer" :class="{
                'bg-gray-800': index === activeIndex,
                'bg-gray-400': index !== activeIndex,
            }" @click="goToSlide(index)"></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            activeIndex: 0,
        };
    },
    methods: {
        prevSlide() {
            this.activeIndex =
                (this.activeIndex - 1 + this.images.length) % this.images.length;
        },
        nextSlide() {
            this.activeIndex = (this.activeIndex + 1) % this.images.length;
        },
        goToSlide(index) {
            this.activeIndex = index;
        },
        getImageStyle(index) {
            const offset = index - this.activeIndex;

            if (offset === 0) {
                return {
                    transform: "translateX(0) scale(1)",
                    zIndex: 10,
                    opacity: 1,
                };
            } else if (offset === -1 || offset === this.images.length - 1) {
                return {
                    transform: "translateX(-100%) rotateY(45deg) scale(0.8)",
                    zIndex: 5,
                    opacity: 0.5,
                };
            } else if (offset === 1 || offset === -(this.images.length - 1)) {
                return {
                    transform: "translateX(100%) rotateY(-45deg) scale(0.8)",
                    zIndex: 5,
                    opacity: 0.5,
                };
            } else {
                return {
                    transform: "translateX(200%) scale(0.5)",
                    zIndex: 1,
                    opacity: 0,
                };
            }
        },
    },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>