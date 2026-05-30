<template>
    <div class="card-3d-container mx-auto " @mousemove="handleMouseMove" @mouseleave="resetTilt" ref="card">
        <!-- 3D Card -->
        <div
            class="card-3d w-full h-full  rounded-lg border border-gray-400 shadow-2xl transform transition-transform duration-300 bg-cardBg">
            <!-- Image Holder -->
            <div
                class="image-holder w-4/5 h-3/5 rounded-lg shadow-lg mx-auto mt-8 overflow-hidden border border-gray-300">
                <img v-if="image" :src="image" alt="Card Image" class="w-full h-full object-cover" />
            </div>
            <!-- Legend -->
            <div v-if="description" class="legend text-center text-gray-700 font-medium mt-4 px-4 mb-4 ">
                {{ description }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card3DComponent",
    props: {
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "Legend text here",
        },
    },
    methods: {
        handleMouseMove(event) {
            const card = this.$refs.card;
            const rect = card.getBoundingClientRect();

            // Calculate mouse position relative to the card
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Calculate the center of the card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation angles
            const rotateX = ((y - centerY) / centerY) * 10; // Tilt on X-axis
            const rotateY = ((x - centerX) / centerX) * -10; // Tilt on Y-axis

            // Apply the rotation to the card
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        },
        resetTilt() {
            const card = this.$refs.card;

            // Reset the rotation
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        },
    },
};
</script>
<style scoped>
.card-3d-container {
    perspective: 1000px;
    height: 80%;
}

.card-3d {
    transform-style: preserve-3d;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-holder {
    transform: translateZ(20px);
    transition: transform 0.3s ease;
}

.legend {
    transform: translateZ(10px);
    transition: transform 0.3s ease;
}

.card-3d-container:hover .card-3d {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>