import { useRouter } from 'vue-router';
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { Routes } from '@/router';

const WAITING_TIME = 5
export const TIME_TO_SHOW_MESSAGE = 2
// const WAITING_TIME = 60
// export const TIME_TO_SHOW_MESSAGE = 30

export const useWaitingModeStore = defineStore('waiting-mode-store', () => {

    const time = ref(WAITING_TIME)
    const router = useRouter()
    const interval = ref<number | null>(null)

    const createWaitingTimeInterval = () => {
        interval.value = setInterval(() => {
            time.value = Math.max(time.value - 1, 0)
        }, 1000)
    }

    const removeWaitingTimeInterval = () => interval.value != null && clearInterval(interval.value)

    watch(() => time.value, (currentTime) => {
        if (currentTime > 0) return
        time.value = WAITING_TIME
        router.replace(Routes.Home)
    })

    const resetTime = () => time.value = WAITING_TIME

    return { time, createWaitingTimeInterval, removeWaitingTimeInterval, resetTime }
})

// export const useWaitingModeStore = defineStore('waiting-mode-store', () => {

//     const getTimeout = () => setTimeout(() => showWaitingModeMessageCallback, TIME_TO_MESSAGE)
//     const showWaitingModeMessage = ref(false)
//     const showWaitingModeMessageTimer = ref(getTimeout())

//     const showWaitingModeMessageCallback = () => {
//         showWaitingModeMessage.value = true
//     }

//     const restartWaitingModeShowMessageTimer = () => {
//         clearTimeout(showWaitingModeMessageTimer.value)
//         showWaitingModeMessageTimer.value = getTimeout()
//     }

//     return { restartWaitingModeShowMessageTimer }
// })