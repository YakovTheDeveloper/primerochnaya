import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChooseView from '@/views/choose-view/ChooseView.vue'
import MakePhotoView from '@/views/make-photo-view/MakePhotoView.vue'
import PhotoResultView from '@/views/photo-result-view/PhotoResultView.vue'
import GetPhotoView from '@/views/get-photo-view/GetPhotoView.vue'

export enum Routes {
  Home = '/',
  Choose = '/choose',
  MakePhoto = '/make-photo',
  PhotoResult = '/photo-result',
  GetPhoto = '/get-photo'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.Home,
      name: 'home',
      component: HomeView,
    },
    {
      path: Routes.Choose,
      name: 'choose',
      component: ChooseView,
    },
    {
      path: Routes.MakePhoto,
      name: 'make-photo',
      component: MakePhotoView,
    },
    {
      path: Routes.PhotoResult,
      name: 'photo-result',
      component: PhotoResultView,
    },
    {
      path: Routes.PhotoResult,
      name: 'photo-result',
      component: GetPhotoView,
    },
  ],
})

export default router
