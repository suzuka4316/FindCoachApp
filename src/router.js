import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from '@/pages/coaches/CoachDetail.vue'
import CoachesList from '@/pages/coaches/CoachesList.vue'
// import CoachRegistration from '@/pages/coaches/CoachRegistration.vue'
// import ContactCoach from '@/pages/requests/ContactCoach.vue'
// import RequestsReceived from '@/pages/requests/RequestsReceived.vue'
// import UserAuth from '@/pages/auth/UserAuth.vue'
import NotFound from '@/pages/NotFound.vue'
import { store } from '@/store/index.js'

// Not recommended to use async components for routing
const CoachDetail = () => import('@/pages/coaches/CoachDetail.vue')
const CoachRegistration = () => import('@/pages/coaches/CoachRegistration.vue')
const ContactCoach = () => import('@/pages/requests/ContactCoach.vue')
const RequestsReceived = () => import('@/pages/requests/RequestsReceived.vue')
const UserAuth = () => import('@/pages/auth/UserAuth.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetail,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

// global navigation guard
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth') // user is not authenticated then navigate to auth page
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches') // user is authenticated then navigate to coaches page
  } else {
    next()
  }
})

