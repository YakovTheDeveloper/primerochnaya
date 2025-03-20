<template>
    <VSlideContainer :route="Routes.PhotoResult">
        <VContainer class="photo-result">
            <h1 class="title large offset">Ваш результат</h1>
            <div class="photo-result__image">
                <img :src="imgUrl" alt="">
            </div>
            <div class="photo-result__actions offset">
                <VButton variant="primary" @click="onHome">
                    <template #icon>
                        <IconHome />
                    </template>
                    На главную
                </VButton>
                <VButton variant="primary" @click="onAgain">
                    <template #icon>
                        <IconAgain />
                    </template>
                    Ещё раз
                </VButton>
                <VButton variant="primary" @click="onDownload">
                    <template #icon>
                        <IconDownload />
                    </template>
                    Скачать
                </VButton>
            </div>
        </VContainer>
    </VSlideContainer>
</template>

<script setup lang="ts">
import IconAgain from '@/components/icons/IconAgain.vue';
import IconDownload from '@/components/icons/IconDownload.vue';
import IconHome from '@/components/icons/IconHome.vue';
import VContainer from '@/components/shared/container/VContainer.vue';
import VSlideContainer from '@/components/shared/container/VSlideContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { Routes } from '@/router';
import { useMakePhotoStore } from '@/stores/makePhotoStore';
import { usePhotoResultStore } from '@/stores/photoResultStore';
import { getServerImageUrl } from '@/utils/getServerImageUrl';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const { resetStore } = useMakePhotoStore()
const router = useRouter()
const photoStore = storeToRefs(usePhotoResultStore())

const imgUrl = computed(() => {
    if (photoStore.photoUrl.value) {
        return getServerImageUrl(photoStore.photoUrl.value)
    }
    return ''
})

const onAgain = () => {
    resetStore()
    router.push(Routes.MakePhoto)
}

const onHome = () => {
    resetStore()
    router.push(Routes.Home)
}
const onDownload = () => {
    router.push(Routes.GetPhoto)
}

</script>

<style scoped lang="scss">
.photo-result {
    &__actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    }

    &__image {
        height: 2894px;
        width: 1664px;
        margin: 0 auto;
        padding: 40px;
        background-color: var(--color-white);

        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>