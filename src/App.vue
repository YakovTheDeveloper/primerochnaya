<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import VButton from './components/shared/v-button/VButton.vue';
import { useDataStore } from './stores/counter';
import { onMounted, ref, watch } from 'vue';
import VSlideContainer from './components/shared/container/VSlideContainer.vue';
const { test } = useDataStore()
const route = useRoute();
const router = useRouter();

const direction = ref("slide");
const history = ref<string[]>([]);

// watch(route, (to, from) => {
//   const toIndex = history.value.indexOf(to.fullPath);
//   const fromIndex = history.value.indexOf(from.fullPath);

//   if (toIndex === -1) {
//     history.value.push(to.fullPath);
//     direction.value = "slide-left"; // Forward navigation
//   } else {
//     history.value.splice(toIndex + 1);
//     direction.value = "slide-right"; // Back navigation
//   }
// });

onMounted(() => {
  const savedHistory = sessionStorage.getItem('routeHistory');
  if (savedHistory) {
    history.value = JSON.parse(savedHistory);
  }
});

watch(history, (newHistory) => {
  sessionStorage.setItem('routeHistory', JSON.stringify(newHistory));
}, { deep: true });

</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="slide">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </RouterView>
  <!-- <div class="test">
    <VButton @click="test('success')">тест успех</VButton>
    <VButton @click="test('fail')">тест фейл</VButton>
  </div> -->
</template>

<style>
.test {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
}


/* Animate new page sliding in from the right */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from{
  transform: translateX(0);
}

.slide-leave-to{
  transform: translateX(-100%);
}
</style>
