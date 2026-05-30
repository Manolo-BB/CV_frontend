import { createRouter, createWebHistory } from 'vue-router'
import MotivationComponent from '../components/MotivationComponent.vue'
import PresentationComponent from '../components/PresentationComponent.vue'
import ProjectsComponent from '@/components/ProjectsComponent.vue'
import PassionsComponent from '@/components/PassionsComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MotivationComponent,
    },
    {
      path: '/motivations',
      name: 'motivation',
      component: () => import('../components/MotivationComponent.vue'),
    },
    {
      path: '/cv',
      name: 'cv',
      component: () => import('../components/PresentationComponent.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../components/ProjectsComponent.vue'),
    },
    {
      path: '/passions',
      name: 'passions',
      component: () => import('../components/PassionsComponent.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../components/ContactComponent.vue'),
    },
    // {
    //   path: '/about',
    //name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import('../views/AboutView.vue'),
    // }, // TO KEEP IN MIND FOR OPTIMISATIONS
  ],
})

export default router
