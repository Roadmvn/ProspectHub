import { createRouter, createWebHistory } from 'vue-router'
import ProspectsView from '../views/ProspectsView.vue'
import TeamView from '../views/TeamView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/prospects'
    },
    {
      path: '/prospects',
      name: 'prospects',
      component: ProspectsView
    },
    {
      path: '/team',
      name: 'team',
      component: TeamView
    }
  ]
})

export default router