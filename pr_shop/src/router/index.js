import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalog',
    name: 'catalog',
  
 
    component: () => import('../views/CatalogView.vue')
  
  },
  {
    path: '/catalog_second_page',
    name: 'catalog_second',
  
 
    component: () => import('../views/SecondCatalogPageView.vue')
  
  },  {
    path: '/catalog_main',
    name: 'catalog_main',
  
 
    component: () => import('../views/MainCatalogPageView.vue')
  
  },  {
    path: '/product',
    name: 'product',
  
 
    component: () => import('../views/ProductView.vue')
  
  },  {
    path: '/auth',
    name: 'auth',
  
 
    component: () => import('../views/AuthView.vue')
  
  },  {
    path: '/card',
    name: 'card',
  
 
    component: () => import('../views/CardView.vue')
  
  },
  {
    path: '/admin',
    name: 'admin',
  
 
    component: () => import('../views/adminView.vue')
  
  },
  {
    path: '/admin_main',
    name: 'admin_main',
  
 
    component: () => import('../views/MainAdminView.vue')
  
  },
  {
    path: '/profile',
    name: 'profile',
  
 
    component: () => import('../views/ProfileView.vue')
  
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
