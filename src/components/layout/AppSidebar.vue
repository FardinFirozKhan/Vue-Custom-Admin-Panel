<template>
  <aside
    :class="[
      'fixed lg:relative z-30 transition-all duration-500 ease-in-out transform',
      'bg-[#0f172a] text-slate-300 border-r border-slate-800/50',
      'w-64',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      !isOpen ? 'lg:w-24' : 'lg:w-72',
      'shadow-2xl lg:shadow-none h-screen flex flex-col'
    ]"
  >
    <!-- Logo Area -->
    <div class="flex items-center justify-between h-20 px-6 mb-4">
      <div class="flex items-center space-x-3 overflow-hidden">
        <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div v-show="isOpen" class="transition-all duration-300 whitespace-nowrap">
          <h1 class="text-xl font-bold text-white tracking-tight">TechNest</h1>
          <p class="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Admin Engine</p>
        </div>
      </div>
      
      <!-- Desktop Toggle -->
      <button
        @click="$emit('close')"
        class="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <svg 
          class="w-5 h-5 transition-transform duration-500" 
          :class="{ 'rotate-180': !isOpen }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar pt-2">
      <div v-for="item in menuItems" :key="item.path">
        <!-- Single Item -->
        <router-link
          v-if="!item.children"
          :to="item.path"
          @click="handleMobileClose"
          class="group flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden"
          :class="[
            $route.path === item.path 
              ? 'bg-blue-600/10 text-white font-medium' 
              : 'hover:bg-slate-800/50 hover:text-white'
          ]"
        >
          <!-- Active Indicator Backdrop -->
          <div 
            v-show="$route.path === item.path"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full"
          ></div>

          <component 
            :is="item.icon" 
            class="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" 
            :class="[ $route.path === item.path ? 'text-blue-500' : 'text-slate-500' ]"
          />
          <span v-show="isOpen" class="ml-4 tracking-wide">{{ item.name }}</span>
          
          <!-- Badge -->
          <span 
            v-if="item.badge && isOpen" 
            class="ml-auto bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-blue-500/20"
          >
            {{ item.badge }}
          </span>

          <!-- Tooltip for collapsed state -->
          <div v-if="!isOpen" class="fixed left-24 bg-slate-900 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
            {{ item.name }}
          </div>
        </router-link>

        <!-- Dropdown Item -->
        <div v-else class="space-y-1">
          <button
            @click="toggleDropdown(item)"
            class="group w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300"
            :class="[
              openDropdowns.includes(item.name) ? 'bg-slate-800/30 text-white' : 'hover:bg-slate-800/50 hover:text-white'
            ]"
          >
            <div class="flex items-center">
              <component :is="item.icon" class="w-6 h-6 text-slate-500 group-hover:text-blue-500 transition-colors" />
              <span v-show="isOpen" class="ml-4 tracking-wide">{{ item.name }}</span>
            </div>
            <svg 
              v-show="isOpen"
              class="w-4 h-4 transition-transform duration-300 text-slate-500"
              :class="{ 'rotate-180': openDropdowns.includes(item.name) }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <transition 
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2 max-h-0"
            enter-to-class="opacity-100 translate-y-0 max-h-40"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 max-h-40"
            leave-to-class="opacity-0 -translate-y-2 max-h-0"
          >
            <div 
              v-if="openDropdowns.includes(item.name) && isOpen"
              class="ml-10 space-y-1"
            >
              <router-link
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                @click="handleMobileClose"
                class="flex items-center px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                :class="[
                  $route.path === child.path 
                    ? 'text-blue-400 bg-blue-400/10' 
                    : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                ]"
              >
                {{ child.name }}
              </router-link>
            </div>
          </transition>
        </div>
      </div>
    </nav>

    <!-- Bottom Section: Profile & Logout -->
    <div class="p-4 mt-auto border-t border-slate-800/50 space-y-2">
      <!-- Profile Link (The requested change) -->
      <router-link
        to="/settings"
        class="group flex items-center px-4 py-3 rounded-xl hover:bg-slate-800/50 transition-all duration-300"
        :class="{ 'bg-blue-600/10 text-white': $route.path === '/settings' }"
      >
        <div class="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 group-hover:border-blue-500 transition-colors overflow-hidden">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="Avatar" />
        </div>
        <div v-show="isOpen" class="ml-3 flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">Admin User</p>
          <p class="text-[10px] text-slate-500 truncate">Settings & Profile</p>
        </div>
        <SettingsIcon v-show="isOpen" class="w-4 h-4 text-slate-500 group-hover:rotate-90 transition-transform duration-500" />
      </router-link>

      <button
        class="w-full flex items-center px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group"
        @click="logout"
      >
        <svg class="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span v-show="isOpen" class="ml-4 font-medium uppercase text-xs tracking-wider">Logout</span>
      </button>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20 lg:hidden"
      @click="$emit('close')"
    />
  </transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as Icons from '@/components/icons'

// Static Icon Components
const { DashboardIcon, UsersIcon, ShoppingIcon, ProductIcon, ChartIcon, SettingsIcon } = Icons

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const route = useRoute()
const openDropdowns = ref<string[]>([])

const isMobileMenuOpen = computed(() => props.isOpen)

const menuItems = ref([
  { name: 'Dashboard', path: '/', icon: DashboardIcon },
  { 
    name: 'Users', 
    path: '/users', 
    icon: UsersIcon,
    badge: '12',
    children: [
      { name: 'All Users', path: '/users/list' },
      { name: 'Add User', path: '/users/add' },
      { name: 'Roles', path: '/users/roles' }
    ]
  },
  { name: 'Orders', path: '/orders', icon: ShoppingIcon, badge: '5' },
  { 
    name: 'Products', 
    path: '/products', 
    icon: ProductIcon,
    children: [
      { name: 'All Products', path: '/products' },
      { name: 'Add Product', path: '/products/create' }
    ]
  },
  { 
    name: 'Analytics', 
    path: '/analytics', 
    icon: ChartIcon,
    children: [
      { name: 'Reports', path: '/analytics/reports' },
      { name: 'Statistics', path: '/analytics/statistics' }
    ]
  }
])

const toggleDropdown = (item: any) => {
  if (openDropdowns.value.includes(item.name)) {
    openDropdowns.value = openDropdowns.value.filter(name => name !== item.name)
  } else {
    openDropdowns.value.push(item.name)
  }
}

const handleMobileClose = () => {
  if (window.innerWidth < 1024) {
    emit('close')
  }
}

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>