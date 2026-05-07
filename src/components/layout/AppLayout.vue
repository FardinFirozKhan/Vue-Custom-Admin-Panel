<template>
  <div class="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
    <AppSidebar :is-open="sidebarOpen" @close="toggleSidebar" />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <AppNavbar @toggle-sidebar="toggleSidebar" />
      
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
        <router-view v-slot="{ Component }">
          <transition 
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'

const sidebarOpen = ref(false)

const updateSidebarState = () => {
  if (window.innerWidth >= 1024) {
    sidebarOpen.value = true
  }
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

onMounted(() => {
  updateSidebarState()
  window.addEventListener('resize', updateSidebarState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})
</script>