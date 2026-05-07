import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/dashboard/Dashboard.vue')
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/users/Users.vue')
    },
    {
      path: '/users/list',
      name: 'User List',
      component: () => import('../views/users/Users.vue')
    },
    {
      path: '/users/add',
      name: 'Add User',
      component: () => import('../views/users/Users.vue')
    },
    {
      path: '/users/roles',
      name: 'User Roles',
      component: () => import('../views/users/Users.vue')
    },
    {
       path: '/orders',
       name: 'Orders',
       component: () => import('../views/orders/Orders.vue')
    },
    {
       path: '/products',
       name: 'Products',
       component: () => import('../views/products/Products.vue')
    },
    {
       path: '/products/create',
       name: 'Create Product',
       component: () => import('../views/products/CreateProduct.vue')
    },
    {
       path: '/analytics',
       name: 'Analytics',
       component: () => import('../views/analytics/Analytics.vue')
    },
    {
       path: '/analytics/reports',
       name: 'Analytics Reports',
       component: () => import('../views/analytics/Analytics.vue')
    },
    {
       path: '/analytics/statistics',
       name: 'Analytics Statistics',
       component: () => import('../views/analytics/Analytics.vue')
    },
    {
       path: '/settings',
       name: 'Settings',
       component: () => import('../views/settings/Settings.vue')
    },
    {
       path: '/login',
       name: 'Login',
       component: () => import('../views/login/Login.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/settings/Settings.vue')
    }
  ]
})

export default router
