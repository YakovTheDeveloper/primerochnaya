<template>
    <div class="make-photo-flash" v-if="showFlash" :class="{ 'flash-animation': showFlash }" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showFlash = ref(false)

const makeFlash = async () => {
    showFlash.value = true
    return new Promise((resolve) => {
        setTimeout(() => {
            showFlash.value = false
            resolve(true)
        }, 400)
    })
}

defineExpose({ makeFlash })

</script>

<style scoped>
.make-photo-flash {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
}

.flash-animation {
    animation: flash 0.4s ease-in-out;
}

@keyframes flash {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>