import { createRouter, createWebHistory } from 'vue-router'
import ChooseView from '@/views/choose-view/ChooseView.vue'
import MakePhotoView from '@/views/make-photo-view/MakePhotoView.vue'
import PhotoResultView from '@/views/photo-result-view/PhotoResultView.vue'
import GetPhotoView from '@/views/get-photo-view/GetPhotoView.vue'
import HomeView from '@/views/home-view/HomeView.vue'

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
      meta: { transition: 'slide-left' }
    },
    {
      path: Routes.Choose,
      name: 'choose',
      component: ChooseView,
      meta: { transition: 'slide-left' }
    },
    {
      path: Routes.MakePhoto,
      name: 'make-photo',
      component: MakePhotoView,
      meta: { transition: 'slide-left' }
    },
    {
      path: Routes.PhotoResult,
      name: 'photo-result',
      component: PhotoResultView,
      meta: { transition: 'slide-left' }
    },
    {
      path: Routes.GetPhoto,
      name: 'get-photo',
      component: GetPhotoView,
      meta: { transition: 'slide-left' }
    },
  ],
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
