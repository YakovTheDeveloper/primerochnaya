import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ResultFetchData, Stage, StatusData } from './types'

export const useDataStore = defineStore('store', () => {

  const stage = ref<Stage>('idle')
  const processingResult = ref<StatusData>(null)


  const setStage = (value: Stage) => stage.value = value

  const makePhoto = () => stage.value = 'countdown'

  const resetStore = () => {
    stage.value = 'idle'
    processingResult.value = null
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

  return { stage, processingResult, sendUserPhotoHandler, makePhoto, setStage, resetStore }
})
