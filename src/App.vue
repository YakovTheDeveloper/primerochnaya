<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import VButton from './components/shared/v-button/VButton.vue';
import { useDataStore } from './stores/counter';
const { test } = useDataStore()
</script>

<template>
  <RouterView />
  <div class="test">
    <VButton @click="test('success')">тест успех</VButton>
    <VButton @click="test('fail')">тест фейл</VButton>
  </div>
</template>

<style scoped>
.test {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
}
</style>
