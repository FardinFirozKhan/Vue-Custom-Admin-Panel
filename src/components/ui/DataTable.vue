<template>
  <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
    <!-- Table Header/Toolbar -->
    <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="relative flex-1 max-w-md">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search records..." 
          class="block w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm text-slate-900 dark:text-white"
        />
      </div>
      <div class="flex items-center gap-3">
        <slot name="toolbar"></slot>
        <button @click="refresh" class="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/50">
            <th v-for="column in columns" :key="column.key" 
              class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              :class="column.class"
            >
              {{ column.label }}
            </th>
            <th v-if="hasActions" class="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="(item, index) in paginatedData" :key="index" 
            class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
          >
            <td v-for="column in columns" :key="column.key" 
              class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300"
              :class="column.class"
            >
              <slot :name="`col-${column.key}`" :item="item">
                {{ item[column.key] }}
              </slot>
            </td>
            <td v-if="hasActions" class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <slot name="actions" :item="item"></slot>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="columns.length + (hasActions ? 1 : 0)" class="px-6 py-12 text-center text-slate-500">
              No records found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <p class="text-sm text-slate-500 font-medium">
        Showing <span class="text-slate-900 dark:text-white font-bold">{{ startRange }}</span> to <span class="text-slate-900 dark:text-white font-bold">{{ endRange }}</span> of <span class="text-slate-900 dark:text-white font-bold">{{ filteredData.length }}</span> results
      </p>
      <div class="flex items-center gap-2">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex items-center gap-1">
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="currentPage === page ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'"
            class="w-10 h-10 rounded-xl text-sm font-bold transition-all"
          >
            {{ page }}
          </button>
        </div>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  hasActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])

const searchQuery = ref('')
const currentPage = ref(1)

const filteredData = computed(() => {
  if (!searchQuery.value) return props.data
  
  const query = searchQuery.value.toLowerCase()
  return props.data.filter(item => {
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(query)
    )
  })
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.pageSize) || 1)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  const end = start + props.pageSize
  return filteredData.value.slice(start, end)
})

const startRange = computed(() => filteredData.value.length === 0 ? 0 : (currentPage.value - 1) * props.pageSize + 1)
const endRange = computed(() => Math.min(currentPage.value * props.pageSize, filteredData.value.length))

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const refresh = () => {
  emit('refresh')
}

watch(searchQuery, () => {
  currentPage.value = 1
})
</script>
