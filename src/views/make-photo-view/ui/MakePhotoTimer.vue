<template>
    <div class="make-photo-timer" v-if="shouldShow">
        {{ countdown }}
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const store = storeToRefs(useDataStore())
const { sendUserPhotoHandler, resetStore } = useDataStore()
const countdown = ref(5);
const router = useRouter()

const startCountdown = () => {
    countdown.value = 5;
    const interval = setInterval(() => {
        if (countdown.value >= 1) {
            countdown.value--;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}

const shouldShow = computed(() => countdown.value > 0 && store.stage.value === 'countdown')

watch(countdown, (newCountdown) => {
    if (newCountdown === 0) sendUserPhotoHandler()
        .then(result => {
            if (!result) return
            router.push('/photo-result')
            resetStore()
        })
})

watch(() => store.stage.value, (newStage) => {
    console.log(`output->newStage`, newStage)
    if (newStage === 'countdown') startCountdown()
})


</script>

<style scoped lang="scss">
.make-photo-timer {
    font-family: 'Montserrat', sans-serif;
    font-size: 150px;
    font-weight: 700;
    height: 350px;
    width: 350px;
    background-color: var(--color-light-beige);
    color: var(--color-dark-beige);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>