<template>
    <VContainer class="make-photo">
        <div class="make-photo__instruction-message offset" v-if="shouldShow">
            <p class="text">Встаньте так, чтобы лицо было чётко различимо</p>
            <p class="text">Затем нажмите кнопку снизу</p>
        </div>
        <MakePhotoTimer class="position-center" />
        <MakePhotoActions v-if="shouldShow" />
    </VContainer>
    <MakePhotoProcessing />
</template>

<script setup lang="ts">
import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { useRouter } from 'vue-router';
import MakePhotoActions from './ui/MakePhotoActions.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/counter';
import MakePhotoTimer from './ui/MakePhotoTimer.vue';
import MakePhotoProcessing from './ui/MakePhotoProcessing.vue';

const store = storeToRefs(useDataStore())

const shouldShow = computed(() => store.stage.value === 'idle' && !store.processingResult.value)

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
        
        body.contrast&{
            background-color: var(--color-light-beige);
        }
    }


}
</style>