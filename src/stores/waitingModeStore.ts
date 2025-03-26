import { useRouter } from 'vue-router';
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { Routes } from '@/router';
import { useMakePhotoStore } from './makePhotoStore';
import { useGetQrStore } from './getFileStore';

// const WAITING_TIME = 5
// export const TIME_TO_SHOW_MESSAGE = 2
const WAITING_TIME = 6000
export const TIME_TO_SHOW_MESSAGE = 30

export const useWaitingModeStore = defineStore('waiting-mode-store', () => {

    const time = ref(WAITING_TIME)
    const router = useRouter()
    const interval = ref<number | null>(null)

    const makePhotoStore = useMakePhotoStore()
    const getQrStore = useGetQrStore()

    const createWaitingTimeInterval = () => {
        interval.value = setInterval(() => {
            time.value = Math.max(time.value - 1, 0)
        }, 1000)
    }

    const removeWaitingTimeInterval = () => {
        if (interval.value == null) return
        clearInterval(interval.value)
        time.value = WAITING_TIME
    }

    const resetAppData = () => {
        makePhotoStore.resetStore()
        getQrStore.reset()
    }

    watch(() => time.value, (currentTime) => {
        if (currentTime > 0) return
        resetAppData()
        time.value = WAITING_TIME
        router.replace(Routes.Home)
    })

    const resetTime = () => time.value = WAITING_TIME

    return { time, createWaitingTimeInterval, removeWaitingTimeInterval, resetTime }
})