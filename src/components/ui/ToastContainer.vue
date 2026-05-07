<template>
  <Teleport to="body">
    <div class="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id" 
          class="pointer-events-auto min-w-[300px] p-4 rounded-2xl shadow-2xl border flex items-center gap-4 animate-in slide-in-from-right duration-300"
          :class="typeClasses[toast.type]"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="iconBgClasses[toast.type]">
            <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <svg v-if="toast.type === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            <svg v-if="toast.type === 'info'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p class="text-sm font-bold">{{ toast.message }}</p>
          <button @click="removeToast(toast.id)" class="ml-auto p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

const typeClasses = {
  success: 'bg-white dark:bg-slate-900 border-green-100 dark:border-green-900/30 text-slate-900 dark:text-white',
  error: 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30 text-slate-900 dark:text-white',
  info: 'bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/30 text-slate-900 dark:text-white',
  warning: 'bg-white dark:bg-slate-900 border-orange-100 dark:border-orange-900/30 text-slate-900 dark:text-white'
}

const iconBgClasses = {
  success: 'bg-green-100 dark:bg-green-900/30 text-green-600',
  error: 'bg-red-100 dark:bg-red-900/30 text-red-600',
  info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
  warning: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
