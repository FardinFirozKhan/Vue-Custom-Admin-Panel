<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white text-gradient">Dashboard Overview</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Fardin. Here's what's happening today.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-sm text-sm font-medium flex items-center gap-2">
           <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span class="text-slate-600 dark:text-slate-300">Live: Updated 2m ago</span>
        </div>
      </div>
    </div>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.name" 
        class="glass p-6 rounded-3xl shadow-sm hover-card border-white/40 dark:border-slate-700/50 group cursor-default"
      >
        <div class="flex items-center justify-between mb-6">
          <div :class="stat.bg" class="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
          <div :class="stat.trend > 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'" class="px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <svg class="w-3 h-3" :class="{ 'rotate-180': stat.trend < 0 }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {{ Math.abs(stat.trend) }}%
          </div>
        </div>
        <div class="space-y-1">
          <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{{ stat.name }}</p>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Performance Chart (Real Component) -->
      <div class="lg:col-span-2 glass p-8 rounded-[2.5rem] shadow-sm border-white/40 dark:border-slate-700/50">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Revenue Performance</h3>
            <p class="text-sm text-slate-500">Real-time revenue analytics</p>
          </div>
          <select class="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 focus:ring-0">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <LineChart :chart-data="revenueChartData" :height="250" />
        
        <div class="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase">Avg. Sale</p>
            <p class="text-lg font-black text-slate-900 dark:text-white">$452.10</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase">Total Sales</p>
            <p class="text-lg font-black text-slate-900 dark:text-white">1,204</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase">Conversion</p>
            <p class="text-lg font-black text-green-500">3.4%</p>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="glass p-8 rounded-[2.5rem] shadow-sm border-white/40 dark:border-slate-700/50">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">Recent Sales</h3>
          <button class="text-sm font-semibold text-blue-500 hover:underline">View All</button>
        </div>
        <div class="space-y-6">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">
              {{ ['JD', 'AS', 'MK', 'LR', 'PW'][i-1] }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-900 dark:text-white truncate">Order #{{ 1024 + i }}</p>
              <p class="text-[10px] text-slate-500">{{ 2 + i }} mins ago</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-black text-slate-900 dark:text-white">+${{ (Math.random() * 500).toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Popular Products -->
      <div class="glass p-8 rounded-[2.5rem] shadow-sm border-white/40 dark:border-slate-700/50">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
             <div class="w-1 h-6 bg-purple-500 rounded-full"></div>
             Top Selling Products
          </h3>
          <button class="text-sm font-semibold text-purple-500 hover:underline">Full Report</button>
        </div>
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all group">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                <img :src="`https://ui-avatars.com/api/?name=P${i}&background=f1f5f9&color=64748b`" class="w-full h-full rounded-lg" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">Premium Laptop Pro {{ i }}</p>
                <p class="text-[10px] text-slate-500 mt-0.5">342 units sold</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-black text-slate-900 dark:text-white">$2,499.00</p>
              <div class="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase mt-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke-width="3"/></svg>
                +12%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tasks/Status -->
      <div class="glass p-8 rounded-[2.5rem] shadow-sm border-white/40 dark:border-slate-700/50">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
             <div class="w-1 h-6 bg-orange-500 rounded-full"></div>
             System Tasks
          </h3>
          <span class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-bold">4 Pending</span>
        </div>
        <div class="space-y-4">
          <div v-for="(task, idx) in ['Update security protocols', 'Monthly backup schedule', 'Review new user applications', 'Database optimization']" :key="idx" 
            class="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800"
          >
            <div class="w-6 h-6 rounded-lg border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
              <div v-if="idx === 3" class="w-3 h-3 bg-blue-500 rounded-sm"></div>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300" :class="{ 'line-through opacity-50': idx === 3 }">{{ task }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingIcon, UsersIcon, ChartIcon } from '@/components/icons'
import LineChart from '@/components/ui/Charts/LineChart.vue'

const stats = ref([
  { name: 'Total Revenue', value: '$45,231.89', trend: 12.5, bg: 'bg-blue-500', icon: ShoppingIcon },
  { name: 'Active Users', value: '2,345', trend: 8.2, bg: 'bg-purple-500', icon: UsersIcon },
  { name: 'New Orders', value: '456', trend: -3.1, bg: 'bg-orange-500', icon: ShoppingIcon },
  { name: 'Server Load', value: '42%', trend: 2.3, bg: 'bg-green-500', icon: ChartIcon }
])

const revenueChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Revenue',
    data: [1200, 1900, 3000, 5000, 2300, 3400, 4100],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true,
    tension: 0.4
  }]
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
