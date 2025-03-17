<script setup lang="ts">
import TouchIcon from '@/assets/icons/touch.svg'

import { useRouter } from 'vue-router';
import HomePhoto from '@/assets/img/photo/home.png'
import VButton from '@/components/shared/v-button/VButton.vue';
import VContainer from '@/components/shared/container/VContainer.vue';
import { Routes } from '@/router';
import VSlideContainer from '@/components/shared/container/VSlideContainer.vue';
const router = useRouter()

</script>

<template>
  <VSlideContainer>
    <VContainer class="home">
      <h1 class="title large offset">Примерь образ 19 века</h1>
      <div class="home__img">
        <img :src="HomePhoto" alt="">
      </div>
      <VButton variant="start" class="offset" @click="router.push(Routes.Choose)">
        <template #icon>
          <img :src="TouchIcon" />
        </template>
        Нажмите, чтобы начать
      </VButton>
    </VContainer>
  </VSlideContainer>
</template>

<style lang="scss">
.home {
  position: relative;

  * {
    z-index: 1;
  }

  &__img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;

    img {
      width: 100%;
    }
  }
}
</style>