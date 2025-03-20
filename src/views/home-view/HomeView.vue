<script setup lang="ts">
import TouchIcon from '@/assets/icons/touch.svg'

import { useRouter } from 'vue-router';
import HomePhoto from '@/assets/img/photo/home.png'
import VButton from '@/components/shared/v-button/VButton.vue';
import VContainer from '@/components/shared/container/VContainer.vue';
import { Routes } from '@/router';
import VSlideContainer from '@/components/shared/container/VSlideContainer.vue';
import { useCostumeStore } from '@/stores/costumeStore';
import { storeToRefs } from 'pinia';
import Loader from '@/components/shared/loader/Loader.vue';
import PopupBody from '@/components/shared/popup/popupBody.vue';
const router = useRouter()

const { costumes, loading } = storeToRefs(useCostumeStore())

</script>

<template>
  <VSlideContainer :route="Routes.Home">
    <VContainer class="home">
      <h1 class="title large offset">Примерь образ 19 века</h1>
      <div class="home__img">
        <img :src="HomePhoto" alt="">
      </div>
      <template v-if="costumes">
        <VButton variant="start" class="offset" @click="router.push(Routes.Choose)">
          <template #icon>
            <img :src="TouchIcon" />
          </template>
          Нажмите, чтобы начать
        </VButton>
      </template>
      <template v-else>
        <PopupBody class="home__loader">
          <Loader />
        </PopupBody>
      </template>
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

  &__loader {
    position: relative;
    bottom: 40px;
  }
}
</style>