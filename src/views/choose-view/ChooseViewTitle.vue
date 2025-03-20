<template>
    <h1 class="title large offset choose-title">
        <transition name="choose-title-fade">
            <!-- Use v-if to control the rendering and ensure only one span exists at a time -->
            <span v-if="props.name" :key="props.name" class="choose-title-text">
                {{ props.name }}
            </span>
        </transition>
    </h1>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
}>()
</script>

<style scoped lang="scss">
.choose-title {
    position: relative;
    height: 1500px;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 100%;

    &-text {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        // transform: translate(-50%, -50%);
    }

    &-fade-enter-active,
    &-fade-leave-active {
        transition: opacity 0.5s ease;
    }

    &-fade-enter-from,
    &-fade-leave-to {
        opacity: 0;
    }

    &-fade-enter-to,
    &-fade-leave-from {
        opacity: 1;
    }
}
</style>