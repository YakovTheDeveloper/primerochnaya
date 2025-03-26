import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { Stage, StatusData } from './types'
import { useRouter } from 'vue-router'
import { fetchGetImageResults, fetchSendUserPhoto } from '@/api'
import { useCostumeStore } from './costumeStore'
import { useGetFileStore } from './getFileStore'
import { usePhotoResultStore } from './photoResultStore'

export const useMakePhotoStore = defineStore('make-photo-store', () => {

  const router = useRouter()
  const costumeStore = storeToRefs(useCostumeStore())
  const newlyCreatedPhotoUrl = ref('')
  const { setPhotoUrl, setPhotoId, setPhotoCode } = usePhotoResultStore()

  const stage = ref<Stage>('idle')
  const processingResult = ref<StatusData>(null)

  const setNewlyCreatedPhotoUrl = (url: string) => {
    newlyCreatedPhotoUrl.value = url
  }

  const setStage = (value: Stage) => stage.value = value

  const makePhoto = () => stage.value = 'countdown'

  const resetStore = () => {
    stage.value = 'idle'
    processingResult.value = null
    newlyCreatedPhotoUrl.value = ''
  }

  const resetStage = () => stage.value = 'idle'

  async function sendUserPhotoHandler(userImage: string) {
    stage.value = 'processing'

    const id = costumeStore.currentCostumeId.value

    const result = await fetchSendUserPhoto({
      costumeId: id,
      userImage,
      backgroundId: id
    })

    if (result.isError) {
      processingResult.value = { status: 'face-not-detected' }
      resetStage()
      return false
    }

    const getImageResult = await fetchGetImageResults(result.data.id)

    if (getImageResult.isError) {
      processingResult.value = { status: 'face-not-detected' }
      resetStage()
      return false
    }

    processingResult.value = { status: 'success' }
    setPhotoUrl(getImageResult.data.image)
    setPhotoId(getImageResult.data.id)
    setPhotoCode(getImageResult.data.code)

    resetStage()
    return true
  }

  return { stage, newlyCreatedPhotoUrl, processingResult, sendUserPhotoHandler, makePhoto, setStage, setNewlyCreatedPhotoUrl, resetStore, resetStage }
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
