<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="close"></div>
        
        <div 
          class="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
          :class="maxWidthClass"
        >
          <!-- Header -->
          <div class="p-8 pb-0 flex items-center justify-between">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ title }}</h3>
            <button @click="close" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
              <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-8">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  maxWidthClass: {
    type: String,
    default: 'max-w-lg'
  }
})

const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.zoom-in-95 {
  animation: zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
