<template>
  <header class="sticky top-0 z-20 transition-all duration-300">
    <div class="glass mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-2xl shadow-sm">
      <div class="flex items-center justify-between h-16 px-4">
        <!-- Left Section -->
        <div class="flex items-center">
          <!-- Mobile Menu Button -->
          <button
            @click="$emit('toggle-sidebar')"
            class="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Breadcrumbs / Page Title -->
          <div class="ml-4 hidden sm:flex items-center space-x-2 text-sm">
             <span class="text-slate-400">Pages</span>
             <span class="text-slate-400 text-xs">/</span>
             <h1 class="font-semibold text-slate-900 dark:text-white capitalize">{{ currentPageTitle }}</h1>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Search -->
          <div class="hidden md:block group">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search anything..."
                class="w-48 lg:w-64 pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none"
              />
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd class="absolute right-3 top-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-slate-700 text-slate-400 border border-slate-200 dark:border-slate-600 shadow-sm pointer-events-none">
                ⌘K
              </kbd>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 transition-all duration-300"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Notifications -->
          <div class="relative notif-dropdown">
            <button
              @click="toggleNotifications"
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 relative transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>

            <!-- Notification Dropdown -->
            <transition name="dropdown">
              <div
                v-if="showNotifications"
                class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50"
              >
                <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Notifications</h3>
                  <button class="text-xs text-blue-500 font-semibold hover:underline">Mark all as read</button>
                </div>
                <div class="max-h-96 overflow-y-auto custom-scrollbar">
                  <div v-for="notif in notifications" :key="notif.id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-50 dark:border-slate-800 last:border-0 transition-colors cursor-pointer group">
                    <div class="flex items-start">
                      <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{{ notif.message }}</p>
                        <p class="text-[10px] text-slate-400 font-medium mt-1">{{ notif.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-3 bg-slate-50 dark:bg-slate-800/50 text-center">
                  <button class="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-500">View all notifications</button>
                </div>
              </div>
            </transition>
          </div>

          <!-- User Menu -->
          <div class="relative user-dropdown">
            <button
              @click="toggleUserMenu"
              class="flex items-center p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-[1px] shadow-sm shadow-blue-500/20">
                <img class="w-full h-full rounded-lg object-cover border-2 border-white dark:border-slate-900" src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="Avatar" />
              </div>
              <div class="hidden sm:block ml-3 text-left">
                <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">{{ userName }}</p>
                <p class="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Super Admin</p>
              </div>
              <svg class="hidden sm:block w-4 h-4 ml-2 text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- User Dropdown -->
            <transition name="dropdown">
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 p-2"
              >
                <div class="px-3 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                </div>
                
                <router-link to="/settings" class="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors">
                    <svg class="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  My Profile
                </router-link>

                <router-link to="/settings" class="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                  <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors">
                    <svg class="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  System Settings
                </router-link>

                <div class="h-[1px] bg-slate-100 dark:bg-slate-800 my-2"></div>
                
                <button @click="logout" class="w-full flex items-center px-3 py-2.5 text-sm font-semibold text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group">
                  <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center mr-3 transition-colors">
                    <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  Sign Out
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const emit = defineEmits<{ (e: 'toggle-sidebar'): void }>()

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)
const isDark = ref(false)

const userName = ref('Fardin Ahsan')
const userInitials = computed(() => {
  return userName.value.split(' ').map(n => n[0]).join('').toUpperCase()
})

const currentPageTitle = computed(() => {
  return route.name ? String(route.name) : 'Dashboard'
})

const notifications = ref([
  { id: 1, message: 'New user registered', time: '2 min ago' },
  { id: 2, message: 'Server update completed', time: '1 hour ago' },
  { id: 3, message: 'Payment received', time: '3 hours ago' },
])

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const logout = () => {
  router.push('/login')
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.notif-dropdown') && !target.closest('.user-dropdown')) {
    showNotifications.value = false
    showUserMenu.value = false
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>