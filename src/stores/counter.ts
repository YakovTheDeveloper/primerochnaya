import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ResultFetchData, Stage, StatusData } from './types'
import { useRoute, useRouter } from 'vue-router'
import MOCK_RESULT_IMG from '@/assets/img/photo/result.png'
export const useDataStore = defineStore('store', () => {

  const router = useRouter()

  const stage = ref<Stage>('idle')
  const processingResult = ref<StatusData>(null)

  const setStage = (value: Stage) => stage.value = value

  const makePhoto = () => stage.value = 'countdown'

  const resetStore = () => {
    stage.value = 'idle'
    processingResult.value = null
  }

  const test = (what: 'success' | 'fail') => {
    if (what === 'success') {
      router.push('/photo-result')
      stage.value = 'idle'
      processingResult.value = { data: { imgUrl: MOCK_RESULT_IMG }, status: 'success' }
      return
    }
    stage.value = 'idle'
    processingResult.value = { status: 'face-not-detected' }

  }



  async function fetchSendUserPhoto(): Promise<ResultFetchData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({
            result: {
              imgUrl: ''
            },
            isError: false,
            message: ''
          });
        } else {
          resolve({
            result: null,
            isError: true,
            message: 'random error'
          });
        }
      }, 1000);
    });
  }

  async function sendUserPhotoHandler() {
    stage.value = 'processing'
    return fetchSendUserPhoto()
      .then((data) => {
        if (!data.result) {

          const data = {
            status: 'face-not-detected' as const
          }
          processingResult.value = data
          return false
        }

        processingResult.value = {
          data: data.result,
          status: 'success'
        }
        return true

      })
      .finally(() => stage.value = 'idle')
  }

  return { stage, processingResult, sendUserPhotoHandler, makePhoto, setStage, resetStore, test }
})
