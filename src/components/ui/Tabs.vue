<template>
  <div class="space-y-6">
    <div class="flex p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit">
      <button 
        v-for="tab in tabs" :key="tab.value"
        @click="activeTab = tab.value"
        :class="activeTab === tab.value ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
        class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  defaultTab: String
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.value)
</script>
