<template>
    <div class="slide-container" :style="style">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { Routes } from '@/router';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ route: Routes }>()



const zIndexToRoute = {
    [Routes.Home]: 1,
    [Routes.Choose]: 2,
    [Routes.MakePhoto]: 3,
    [Routes.PhotoResult]: 4,
    [Routes.GetPhoto]: 5,
}

const style = computed(() => ({
    zIndex: zIndexToRoute[props.route]
}))

</script>

<style scoped>
.slide-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>