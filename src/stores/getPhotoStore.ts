import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { GetPhotoStatusData, ResultFetchData, ResultFetchEmail, Stage, StatusData } from './types'
import { useRoute, useRouter } from 'vue-router'
import MOCK_RESULT_IMG from '@/assets/img/photo/result.png'
export const useGetPhotoStore = defineStore('get-photo-store', () => {

    const router = useRouter()

    const result = ref<GetPhotoStatusData | null>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<boolean | null>(null)

    const reset = () => {
        result.value = null
        isLoading.value = false
        error.value = null
    }


    async function fetchSendEmail(): Promise<ResultFetchEmail> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve({
                        result: 'success',
                        isError: false,
                        message: ''
                    });
                } else {
                    resolve({
                        result: 'failure',
                        isError: true,
                        message: 'random error'
                    });
                }
            }, 1000);
        });
    }

    async function sendEmailHandler() {
        isLoading.value = true
        return fetchSendEmail()
            .then((data) => {
                result.value = data.result
                error.value = data.isError
            })
            .finally(() => isLoading.value = false)
    }

    return { result, isLoading, error, sendEmailHandler, reset }
})
