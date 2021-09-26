import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listview',
    name: 'ListView',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    beforeEnter:(to,from,next)=>{
      if(store.state.user.isLogin){
        next()
      }else{
        next("/login")
      }
    },

    component: () => import('../views/Mine.vue')
  },
  {
    path: '/leaderboard',
    name: 'LeaderBoard',
    component: () => import('../views/LeaderBoard.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
