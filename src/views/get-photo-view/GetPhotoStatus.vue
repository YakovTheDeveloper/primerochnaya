<template>
    <Overlay v-if="shouldShowModal">
        <PopupBody v-if="store.loading.value">
            <Loader />
        </PopupBody>
        <PopupBody v-else-if="showSuccessMessage">
            <template #icon>
                <IconSuccess />
            </template>
            <p class="title popup">Фотография отправлена</p>
            <p class="text center">Сообщение скоро поступит<br />
                на адрес электронной почты
            </p>
            <template #actions>
                <VButton variant="primary" @click="onExit">
                    На главную
                </VButton>
            </template>
        </PopupBody>
        <PopupBody v-else-if="showFailMessage">
            <template #icon>
                <IconFailure />
            </template>
            <p class="title popup">Не удалось отправить</p>
            <p class="text">Попробуйте ещё раз</p>
            <template #actions>
                <VButton variant="secondary" @click="onExit">
                    На главную
                </VButton>
                <VButton variant="primary" @click="onAgain">
                    Ещё раз
                </VButton>
            </template>
        </PopupBody>
        <PopupBody v-else>
            <template #icon>
                <IconConnection />
            </template>
            <p class="title popup">Нет соединения</p>
            <p class="text">Попробуйте позже</p>
            <template #actions>
                <VButton variant="primary" @click="onAgain">
                    Назад
                </VButton>
            </template>
        </PopupBody>
    </Overlay>
</template>

<script setup lang="ts">
import IconConnection from '@/components/icons/IconConnection.vue';
import IconFailure from '@/components/icons/IconFailure.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';
import Loader from '@/components/shared/loader/Loader.vue';
import Overlay from '@/components/shared/overlay/Overlay.vue';
import PopupBody from '@/components/shared/popup/popupBody.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { Routes } from '@/router';
import { useGetFileStore } from '@/stores/getFileStore';
import { useGetPhotoStore } from '@/stores/getPhotoStore';
import { storeToRefs } from 'pinia';
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = storeToRefs(useGetFileStore())
const { reset } = useGetFileStore()
const shouldShowModal = computed(() => store.error.value || store.loading.value || !!store.data.value)

const onAgain = () => reset()

const onExit = () => {
    router.push(Routes.Home)
}

const showFailMessage = computed(() => store.error.value)
const showSuccessMessage = computed(() => !store.error.value && store.data)




</script>

<style scoped></style>