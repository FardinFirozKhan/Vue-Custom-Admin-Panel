<template>
  <div class="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
    <div v-for="(item, index) in items" :key="index" class="group">
      <button 
        @click="toggle(index)"
        class="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all"
      >
        <span class="text-base font-bold text-slate-900 dark:text-white">{{ item.title }}</span>
        <svg 
          class="w-5 h-5 text-slate-400 transition-transform duration-300" 
          :class="{ 'rotate-180 text-blue-500': openIndex === index }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        v-show="openIndex === index"
        class="px-8 pb-8 text-sm text-slate-500 dark:text-slate-400 leading-relaxed animate-in slide-in-from-top-2 duration-300"
      >
        {{ item.content }}
        <slot :name="`content-${index}`"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  items: Array
})

const openIndex = ref(0)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>
