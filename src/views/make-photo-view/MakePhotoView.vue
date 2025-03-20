<template>
    <VSlideContainer :route="Routes.MakePhoto">
        <VContainer class="make-photo">
            <MakePhotoCamera ref="cameraRef" />
            <div class="make-photo__instruction-message offset" v-if="shouldShow">
                <p class="text">Встаньте так, чтобы лицо было чётко различимо</p>
                <p class="text">Затем нажмите кнопку снизу</p>
            </div>
            <MakePhotoTimer class="position-center" ref="timerRef" />
            <MakePhotoActions v-if="shouldShow" />
        </VContainer>
        <MakePhotoProcessing />
        <MakePhotoFlash ref="flashRef" />
    </VSlideContainer>
</template>

<script setup lang="ts">
import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { useRouter } from 'vue-router';
import MakePhotoActions from './ui/MakePhotoActions.vue';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMakePhotoStore } from '@/stores/makePhotoStore';
import MakePhotoTimer from './ui/MakePhotoTimer/MakePhotoTimer.vue';
import MakePhotoProcessing from './ui/MakePhotoProcessing.vue';
import VSlideContainer from '@/components/shared/container/VSlideContainer.vue';
import MakePhotoCamera from './ui/MakePhotoCamera.vue';
import { Routes } from '@/router';
import MakePhotoFlash from './ui/MakePhotoFlash.vue';
import { useCostumeStore } from '@/stores/costumeStore';

const router = useRouter()
const timerRef = ref()
const flashRef = ref()
const cameraRef = ref()
const store = storeToRefs(useMakePhotoStore())
const costumeStore = storeToRefs(useCostumeStore())
const { sendUserPhotoHandler } = useMakePhotoStore()

const shouldShow = computed(() => store.stage.value === 'idle' && !store.processingResult.value)


watch(() => store.stage.value, async (newStage) => {
    if (newStage !== 'countdown') return

    await timerRef.value.startCountdown()
    await flashRef.value.makeFlash()
    const photo = cameraRef.value.capturePhoto()
    console.log(`output->photo`, photo)
    const result = await sendUserPhotoHandler(photo)
    result && router.push(Routes.PhotoResult)

})

</script>

<style scoped lang="scss">
.make-photo {
    position: relative;

    &__instruction-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 48px;
        border-radius: 40px;
        background-color: var(--color-light-beige);
        z-index: 1;

        body.contrast & {
            background-color: var(--color-light-beige);
        }
    }


}
</style>