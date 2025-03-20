import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { Stage, StatusData } from './types'
import { useRouter } from 'vue-router'
import { fetchSendUserPhoto } from '@/api'
import { useCostumeStore } from './costumeStore'

export const useMakePhotoStore = defineStore('make-photo-store', () => {

  const router = useRouter()

  const costumeStore = storeToRefs(useCostumeStore())


  const stage = ref<Stage>('idle')
  const processingResult = ref<StatusData>(null)

  const setStage = (value: Stage) => stage.value = value

  const makePhoto = () => stage.value = 'countdown'

  const resetStore = () => {
    stage.value = 'idle'
    processingResult.value = null
  }

  const resetStage = () => stage.value = 'idle'

  async function sendUserPhotoHandler(userImage: string) {
    stage.value = 'processing'

    const result = await fetchSendUserPhoto({
      costumeId: costumeStore.currentCostumeId.value,
      userImage
    })

    if (result.isError) {
      processingResult.value = { status: 'face-not-detected' }
      resetStage()
      return false
    }

    processingResult.value = { status: 'success' }
    resetStage()
    return true
  }

  return { stage, processingResult, sendUserPhotoHandler, makePhoto, setStage, resetStore, resetStage }
})


// const test = (what: 'success' | 'fail') => {
//   if (what === 'success') {
//     router.push(Routes.PhotoResult)
//     stage.value = 'idle'
//     processingResult.value = { data: { imgUrl: MOCK_RESULT_IMG }, status: 'success' }
//     return
//   }
//   stage.value = 'idle'
//   processingResult.value = { status: 'face-not-detected' }

// }
