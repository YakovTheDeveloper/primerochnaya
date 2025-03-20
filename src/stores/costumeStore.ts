import { fetchGetCostumes } from '@/api';
import type { Costume } from '../entities/index';
import { defineStore } from "pinia";
import { computed, effect, ref, watch } from "vue";
import { useFetch } from '@/composables/useFetch';

export const useCostumeStore = defineStore('costume-store', () => {
    const { data: costumes, error, fetchData, loading } = useFetch(fetchGetCostumes)

    const currentCostumeId = ref(-1)
    const currentCostume = computed(() => {
        return costumes.value?.find(({ id }) => id === currentCostumeId.value)
    })

    const onChoose = (id: number) => currentCostumeId.value = id

    const getCostumesHandler = async () => fetchData()

    const loadImages = (costumes: Costume[]) => {
        if (!costumes) return
        costumes.forEach(({ image = '' }) => {
            const img = new Image()
            img.src = image
        })
    }

    watch(() => costumes.value, (costumes) => {
        if (!costumes) return
        currentCostumeId.value = costumes[0]?.id || -1
        loadImages(costumes)
    })


    return {
        currentCostumeId,
        currentCostume,
        costumes,
        loading,
        onChoose,
        getCostumesHandler
    }
})
