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
import { useDataStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Routes } from '../../../router';

const store = storeToRefs(useDataStore())
const { sendUserPhotoHandler, resetStore, resetStage } = useDataStore()
const countdown = ref(5);
const router = useRouter()


const stopStyles: Record<string, Partial<CSSStyleDeclaration>> = {
    init: {
        transform: 'translateY(0)',
        opacity: '1',
        width: '350px',
        fontSize: '150px',
        boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.01)',
        zIndex: '3'
    },
    first: {
        transform: 'translateY(220px)',
        opacity: '0.6',
        width: '300px',
        fontSize: '128px',
        boxShadow: '0px 0px 34.2857px rgba(0, 0, 0, 0.01)',
        zIndex: '2'

    },
    second: {
        transform: 'translateY(420px)',
        opacity: '0.2',
        width: '250px',
        fontSize: '107px',
        boxShadow: '0px 0px 28.5714px rgba(0, 0, 0, 0.01)',
        zIndex: '1'

    },
    out: {
        transform: 'translateY(500px)',
        opacity: '0',
        width: '200px'
    }
}

const animationByStepAndCountdown: Record<number, Record<number, Partial<CSSStyleDeclaration>>> = {
    1: {
        5: stopStyles.init,
        4: stopStyles.first,
        3: stopStyles.second,
        2: stopStyles.out,
        1: stopStyles.out
    },
    2: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.first,
        2: stopStyles.second,
        1: stopStyles.out
    },
    3: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.init,
        2: stopStyles.first,
        1: stopStyles.second,
    },
    4: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.init,
        2: stopStyles.init,
        1: stopStyles.first,
    },
    5: {
        5: stopStyles.init,
        4: stopStyles.init,
        3: stopStyles.init,
        2: stopStyles.init,
        1: stopStyles.init,
    }
}

const getTimerStyleByElemenCount = (count: number) => {
    return animationByStepAndCountdown[count][countdown.value]
};


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
            router.push(Routes.PhotoResult)
            resetStage()
        })
})

watch(() => store.stage.value, (newStage) => {
    if (newStage === 'countdown') startCountdown()
})

// watchEffect(() => startCountdown())

</script>

<style scoped lang="scss">
.make-photo-timer-container {
    position: relative;
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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

    /* &__item-wrapper {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
    } */

}
</style>
