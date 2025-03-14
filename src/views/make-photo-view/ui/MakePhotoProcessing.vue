<template>
    <Overlay v-if="showLoadingMessage">
        <PopupBody>
            <p class="title popup">Обработка фотографии</p>
            <p class="text">Пожалуйста, подождите</p>
            <Loader />
        </PopupBody>
    </Overlay>
    <Overlay v-if="showErrorMessage">
        <PopupBody>
            <p class="title popup">Лицо не обнаружено</p>
            <p class="text">Попробуйте ещё раз</p>
            <template #actions>
                <VButton variant="secondary" @click="onExit">
                    <template #icon>
                        <IconHome />
                    </template>
                    Выйти
                </VButton>
                <VButton variant="primary" @click="onAgain">
                    <template #icon>
                        <IconAgain />
                    </template>
                    Ещё раз
                </VButton>
            </template>
        </PopupBody>
    </Overlay>
</template>

<script setup lang="ts">
import IconAgain from '@/components/icons/IconAgain.vue';
import IconHome from '@/components/icons/IconHome.vue';
import Loader from '@/components/shared/loader/Loader.vue';
import Overlay from '@/components/shared/overlay/Overlay.vue';
import PopupBody from '@/components/shared/popup/popupBody.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { useDataStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = storeToRefs(useDataStore())
const { resetStore } = useDataStore()
const showLoadingMessage = computed(() => {
    return store.stage.value === 'processing'
})
const showErrorMessage = computed(() => {
    return store.processingResult.value?.status === 'face-not-detected' && store.stage.value !== 'processing'
})
const router = useRouter()

const onAgain = () => resetStore()
const onExit = () => {
    resetStore()
    router.push('/')
}

</script>

<style scoped></style>