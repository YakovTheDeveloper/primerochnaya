<template>
    <div class="make-photo-timer-container" v-if="shouldShow">
        <template v-for="count in 5">
            <div class="text make-photo-timer" :style="getTimerStyleByElemenCount(6 - count) as any">
                {{ count }}
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Routes } from '../../../../router';
import { animationByStepAndCountdown } from './animation';
import { useMakePhotoStore } from '@/stores/makePhotoStore';

const store = storeToRefs(useMakePhotoStore())
const countdown = ref(5);

const getTimerStyleByElemenCount = (count: number) => {
    return animationByStepAndCountdown[count][countdown.value]
};

const startCountdown = async () => {
    return new Promise((resolve) => {
        countdown.value = 5;
        const interval = setInterval(() => {
            console.log(countdown.value)
            if (countdown.value === 1) {
                clearInterval(interval);
                resolve(true)
            } else {
                countdown.value--;
            }
        }, 1000);
    })
}

const shouldShow = computed(() => countdown.value > 0 && store.stage.value === 'countdown')

defineExpose({
    startCountdown
})

</script>

<style scoped lang="scss">
.make-photo-timer-container {
    position: relative;
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-make-photo-actions);
    display: flex;
    align-items: center;
    justify-content: center;
}

.make-photo-timer {
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-size: 150px;
    font-weight: 700;
    aspect-ratio: 1;
    width: 350px;
    background-color: var(--color-light-beige);
    color: var(--color-dark-beige);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s ease-in-out, width 0.5s ease-in-out;
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
