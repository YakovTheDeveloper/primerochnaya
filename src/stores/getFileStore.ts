import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { Stage, StatusData } from './types'
import { useRouter } from 'vue-router'
import { fetchGetQr, fetchSendEmail, fetchSendUserPhoto } from '@/api'
import { useCostumeStore } from './costumeStore'
import { useFetch } from '@/composables/useFetch'
import type { GenerateQrPayload, SendEmailPayload } from '@/api/types/api'
import { usePhotoResultStore } from './photoResultStore'

export const useGetFileStore = defineStore('get-file-store', () => {

  const { data, error, fetchData, loading, reset } = useFetch(fetchSendEmail)
  const photoResultStore = storeToRefs(usePhotoResultStore())

  const sendToEmailHandler = async (email: string) => {
    await fetchData({
      email,
      imageResults: [photoResultStore.photoId.value]
    })

  }

  return { sendToEmailHandler, data, loading, error, reset }
})

export const useGetQrStore = defineStore('get-file-store-qr', () => {

  const { data, error, fetchData, loading, reset } = useFetch(fetchGetQr)
  const photoResultStore = storeToRefs(usePhotoResultStore())

  const generateQrHandler = async () => {
    await fetchData({
      imageResults: [photoResultStore.photoId.value]
    })

  }

  return { generateQrHandler, data, loading, error, reset }
})

