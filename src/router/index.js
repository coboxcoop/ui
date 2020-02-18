import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView
}]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})