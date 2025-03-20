<template>
    <transition name="choose-main-photo">
        <div class="choose-main-photo" :key="props.imgUrl">
            <img :src="props.imgUrl" alt="">
        </div>
    </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
    imgUrl: string
}>()
</script>

<style scoped lang="scss">
.choose-main-photo {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 3006px;
    bottom: 0;
    right: 0;
    left: 0;


    &-enter-active,
    &-leave-active {
        transition: opacity 0.3s ease-in-out , transform 0.3s ease-in-out ;
    }

    &-enter-from {
        opacity: 0;
        transform: scale(1, 1.1);
    }

    &-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    &-leave-from {
        opacity: 1;
        transform: scale(1);

    }

    &-leave-to {
        opacity: 0;
        transform: scale(1, 1.1);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>