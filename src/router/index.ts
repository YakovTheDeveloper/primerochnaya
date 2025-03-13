import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChooseView from '@/views/choose-view/ChooseView.vue'
import MakePhotoView from '@/views/make-photo-view/MakePhotoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/choose',
      name: 'choose',
      component: ChooseView,
    },
    {
      path: '/make-photo',
      name: 'make-photo',
      component: MakePhotoView,
    },
    {
      path: '/photo-result',
      name: 'photo-result',
      component: HomeView,
    },
  ],
})

export default router
