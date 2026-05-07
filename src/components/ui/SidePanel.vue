<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm" @click="close"></div>
    </Transition>
    
    <Transition name="slide-panel">
      <div v-if="isOpen" 
        class="fixed inset-y-0 right-0 z-[70] w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
        :class="maxWidthClass"
      >
        <div class="p-8 h-full flex flex-col">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ title }}</h3>
            <button @click="close" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  maxWidthClass: {
    type: String,
    default: 'max-w-lg'
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Panel Transition */
.slide-panel-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.slide-panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.7, 0, 0.84, 0), opacity 0.3s ease;
}

.slide-panel-enter-from {
  transform: translateX(100%);
  opacity: 0.5;
}

.slide-panel-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
