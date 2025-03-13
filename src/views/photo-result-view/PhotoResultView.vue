<template>
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
</template>

<script setup lang="ts">
import IconAgain from '@/components/icons/IconAgain.vue';
import IconDownload from '@/components/icons/IconDownload.vue';
import IconHome from '@/components/icons/IconHome.vue';
import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { Routes } from '@/router';
import { useDataStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const store = storeToRefs(useDataStore())
const { resetStore } = useDataStore()
const router = useRouter()

const imgUrl = computed(() => {
    if (store.processingResult.value?.status === 'success') {
        return store.processingResult.value?.data.imgUrl
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
const onDownload = () => { }

</script>

<style scoped lang="scss">
.photo-result {
    &__actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
    }

    &__image {
        margin: 0 auto;
        padding: 40px;
        background-color: var(--color-white);
    }
}
</style>