<script setup lang="ts">
import TouchIcon from '@/assets/icons/touch.svg'
import VContainer from './shared/container/VContainer.vue';
import VButton from './shared/v-button/VButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

</script>

<template>
  <VContainer>
    <h1 class="title large offset">Примерь образ 19 века</h1>
    <VButton variant="start" class="offset" @click="router.push('/choose')">
      <template #icon>
        <img :src="TouchIcon" />
      </template>
      Нажмите, чтобы начать
    </VButton>
  </VContainer>
</template>
