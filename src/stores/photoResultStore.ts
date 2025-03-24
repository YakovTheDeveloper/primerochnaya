

import { ref } from 'vue'
import { defineStore } from 'pinia'


export const usePhotoResultStore = defineStore('photo-result-store', () => {

    const photoUrl = ref('')
    const photoId = ref(-1)
    const photoCode = ref('')
    const setPhotoUrl = (url: string) => photoUrl.value = url
    const setPhotoId = (id: number) => photoId.value = id
    const setPhotoCode = (code: string) => photoCode.value = code


    return { photoCode,photoUrl, photoId, setPhotoUrl, setPhotoId, setPhotoCode }
})

