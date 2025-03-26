<template>
    <div v-if="store.newlyCreatedPhotoUrl.value" class="make-photo-background">
        <img :src="store.newlyCreatedPhotoUrl.value" alt="">
    </div>
</template>

<script setup lang="ts">
import { useMakePhotoStore } from '@/stores/makePhotoStore';
import { storeToRefs } from 'pinia';


const store = storeToRefs(useMakePhotoStore())


</script>

<style scoped lang="scss">
.make-photo-background {
    z-index: var(--z-index-make-photo-bg);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 2160px;
        object-fit: contain;
        transform: scale(-1) rotate(90deg);
    }
}
</style>