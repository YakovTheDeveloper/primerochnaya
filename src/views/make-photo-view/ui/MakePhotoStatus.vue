<template>
    <div class="make-photo-status">
        <MakePhotoTimer />
        <MakePhotoProcessing />
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

import { ref } from 'vue';
import MakePhotoTimer from './MakePhotoTimer.vue';
import { useDataStore } from '@/stores/counter';
import MakePhotoProcessing from './MakePhotoProcessing.vue';








</script>

<style scoped>
.make-photo-status {
    margin: 0 auto;
}
</style>