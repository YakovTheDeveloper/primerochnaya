<template>
    <div class="loader-container">
        <IconLoader class="loader-item" />
    </div>
</template>

<script setup lang="ts">
import IconLoader from '@/components/icons/IconLoader.vue';
import { useWaitingModeStore } from '@/stores/waitingModeStore';
import { onMounted, onUnmounted } from 'vue';
const { removeWaitingTimeInterval, createWaitingTimeInterval } = useWaitingModeStore()

onMounted(() => removeWaitingTimeInterval())
onUnmounted(() => createWaitingTimeInterval())

</script>

<style scoped>
.loader-container {
    padding: 64px;
}

.loader-item {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(-360deg);
    }
}
</style>