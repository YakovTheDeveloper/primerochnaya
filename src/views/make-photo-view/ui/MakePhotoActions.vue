<template>
    <div class="make-photo-actions">
        <VButton size="medium" variant="text" class="make-photo-actions__back-btn">
            <template #icon>
                <IconBack />
            </template>
            Назад
        </VButton>
        <VButton variant="primary" @click="onPhoto" class="make-photo-actions__camera-btn">
            <IconCamera />
        </VButton>
    </div>
</template>

<script setup lang="ts">
import IconBack from '@/components/icons/IconBack.vue';
import IconCamera from '@/components/icons/IconCamera.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { useDataStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const { setStage } = useDataStore()
const store = storeToRefs(useDataStore())

const onPhoto = () => {
    setStage('countdown')
}
watchEffect(() => {
    console.log(`output->stage`, store.stage.value)
})

const router = useRouter()


</script>

<style lang="scss" scoped>
.make-photo-actions {
    padding: 350px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(70, 50, 20, 0) 0%, #463214 100%);
    position: relative;


    &__back-btn {
        // position: absolute;
        // top: 50%;
        // left: 0;
        // transform: translateY(-50%)
        width: fit-content;
        padding-left: 0;
    }

    &__camera-btn {
        width: fit-content;
        margin: 0 auto;
        padding: 111px;
        border-radius: 50%;
        border: 12px solid var(--color-white);
    }
}
</style>