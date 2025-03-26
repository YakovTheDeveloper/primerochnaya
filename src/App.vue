<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import VButton from './components/shared/v-button/VButton.vue';
import { useMakePhotoStore } from './stores/makePhotoStore';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import VSlideContainer from './components/shared/container/VSlideContainer.vue';
import { useCostumeStore } from './stores/costumeStore';
import { useWaitingModeStore } from './stores/waitingModeStore';


const { createWaitingTimeInterval, resetTime, removeWaitingTimeInterval } = useWaitingModeStore();
const history = ref<string[]>([]);


const createTerminalControlPanel = () => {
  let script = document.createElement('script');

  script.src = '/exiter.js?v=' + new Date().getTime()

  script.onload = () => {
    console.log('exiter.js has been loaded');
  }

  document.head.appendChild(script);
}

const { getCostumesHandler } = useCostumeStore()

onUnmounted(() => removeWaitingTimeInterval())

onMounted(() => {
  createWaitingTimeInterval()
  getCostumesHandler();
  createTerminalControlPanel()

  document.querySelector('body')?.addEventListener('click', () => {
    resetTime()
  })




  const savedHistory = sessionStorage.getItem('routeHistory');
  if (savedHistory) {
    history.value = JSON.parse(savedHistory);
  }

  // Lock vertical scroll
  document.body.style.overflowY = 'hidden';
});



watch(history, (newHistory) => {
  sessionStorage.setItem('routeHistory', JSON.stringify(newHistory));
}, { deep: true });

</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="slide">

      <component :is="Component" :key="route.path" />

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

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
