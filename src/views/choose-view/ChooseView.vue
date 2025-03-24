<script setup lang="ts">

import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { useRouter } from 'vue-router';
import IconContrast from '@/components/icons/IconContrast.vue';
import { Routes } from '@/router';
import VSlideContainer from '@/components/shared/container/VSlideContainer.vue';
import ChooseViewMainPhoto from './ChooseViewMainPhoto.vue';
import ChooseViewTitle from './ChooseViewTitle.vue';
import ChooseViewSelect from './ChooseViewSelect.vue';
import { storeToRefs } from 'pinia';
import { useCostumeStore } from '@/stores/costumeStore';
import { getServerImageUrl } from '@/utils/getServerImageUrl';
import WaitingMode from '@/components/popups/waiting-mode/WaitingMode.vue';

const store = storeToRefs(useCostumeStore())
const { onChoose } = useCostumeStore()

const toggleContrast = () => {
    document.querySelector('body')?.classList.toggle('contrast')
}
const router = useRouter()

</script>

<template>
    <VSlideContainer :route="Routes.Choose">
        <VContainer class="choose">
            <ChooseViewTitle :name="store.currentCostume?.value?.title || ''" />
            <ChooseViewMainPhoto :img-url="getServerImageUrl(store.currentCostume?.value?.image || '')" />
            <div class="choose-variants offset">
                <VButton size="small" variant="special" class="special-btn" @click="toggleContrast">
                    <template #icon>
                        <IconContrast />
                    </template>
                    Режим для слабовидящих
                </VButton>
                <ChooseViewSelect :data="store.costumes.value || []" :chosen="store.currentCostume.value"
                    :onChoose="onChoose" />
                <VButton :disabled="!store.currentCostume.value" variant="primary"
                    @click="router.replace(Routes.MakePhoto)">
                    Выбрать
                </VButton>
            </div>
        </VContainer>
    </VSlideContainer>
</template>



<style scoped lang="scss">
.choose {
    position: relative;

    * {
        z-index: 1;
    }
}

.choose-variants {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
}





.special-btn {
    width: fit-content;
}
</style>