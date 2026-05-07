<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Order Management</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Track, manage, and fulfill customer orders.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button 
            v-for="filter in ['All', 'Pending', 'Shipped', 'Delivered']" 
            :key="filter"
            @click="activeFilter = filter"
            :class="activeFilter === filter ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </div>

    <DataTable 
      :columns="columns" 
      :data="filteredOrders" 
      :has-actions="true"
      @refresh="fetchOrders"
    >
      <template #col-orderId="{ item }">
        <span class="font-bold text-blue-600 dark:text-blue-400">#{{ item.orderId }}</span>
      </template>

      <template #col-customer="{ item }">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
            {{ item.customer.split(' ').map(n => n[0]).join('') }}
          </div>
          <span class="font-medium text-slate-900 dark:text-white">{{ item.customer }}</span>
        </div>
      </template>

      <template #col-status="{ item }">
        <span 
          :class="statusClasses[item.status]"
          class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase"
        >
          {{ item.status }}
        </span>
      </template>

      <template #col-total="{ item }">
        <span class="font-black text-slate-900 dark:text-white">${{ item.total.toLocaleString() }}</span>
      </template>

      <template #actions="{ item }">
        <button @click="viewOrder(item)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button @click="printOrder(item)" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </template>
    </DataTable>

    <!-- Order Detail Side Panel -->
    <SidePanel 
      :is-open="isPanelOpen" 
      :title="selectedOrder ? `Order Details #${selectedOrder.orderId}` : 'Order Details'"
      @close="isPanelOpen = false"
    >
      <div v-if="selectedOrder" class="space-y-8">
        <!-- Status Header -->
        <div class="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Status</p>
            <p class="text-lg font-black text-slate-900 dark:text-white mt-1">{{ selectedOrder.status }}</p>
          </div>
          <button class="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/20">Update Status</button>
        </div>

        <!-- Customer Info -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Customer Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p class="text-[10px] text-slate-500 font-bold uppercase">Name</p>
              <p class="text-sm font-medium text-slate-900 dark:text-white">{{ selectedOrder.customer }}</p>
            </div>
            <div class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p class="text-[10px] text-slate-500 font-bold uppercase">Email</p>
              <p class="text-sm font-medium text-slate-900 dark:text-white">customer@example.com</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Order Items</h4>
          <div class="space-y-3">
            <div v-for="i in 3" :key="i" class="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"></div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">Premium Item {{ i }}</p>
                  <p class="text-xs text-slate-500">Qty: {{ i }}</p>
                </div>
              </div>
              <p class="text-sm font-black text-slate-900 dark:text-white">${{ (120 * i).toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500 font-medium">Subtotal</span>
            <span class="text-slate-900 dark:text-white font-bold">${{ (selectedOrder.total * 0.9).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500 font-medium">Tax (10%)</span>
            <span class="text-slate-900 dark:text-white font-bold">${{ (selectedOrder.total * 0.1).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-lg pt-4">
            <span class="text-slate-900 dark:text-white font-black">Total</span>
            <span class="text-blue-600 font-black">${{ selectedOrder.total.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </SidePanel>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from '@/components/ui/DataTable.vue'
import SidePanel from '@/components/ui/SidePanel.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()
const activeFilter = ref('All')
const isPanelOpen = ref(false)
const selectedOrder = ref(null)

const columns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' }
]

const orders = ref([
  { id: 1, orderId: 'ORD-7721', customer: 'John Doe', date: '2024-03-21', total: 1250.00, status: 'Pending' },
  { id: 2, orderId: 'ORD-7722', customer: 'Sarah Smith', date: '2024-03-20', total: 850.50, status: 'Delivered' },
  { id: 3, orderId: 'ORD-7723', customer: 'Michael Brown', date: '2024-03-19', total: 2100.00, status: 'Shipped' },
  { id: 4, orderId: 'ORD-7724', customer: 'Emma Wilson', date: '2024-03-18', total: 450.00, status: 'Pending' },
  { id: 5, orderId: 'ORD-7725', customer: 'David Lee', date: '2024-03-17', total: 1575.25, status: 'Delivered' },
])

const filteredOrders = computed(() => {
  if (activeFilter.value === 'All') return orders.value
  return orders.value.filter(o => o.status === activeFilter.value)
})

const statusClasses = {
  'Pending': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30',
  'Shipped': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
  'Delivered': 'bg-green-100 text-green-600 dark:bg-green-900/30'
}

const viewOrder = (order) => {
  selectedOrder.value = order
  isPanelOpen.value = true
}

const printOrder = (order) => {
  toast.info(`Preparing invoice for ${order.orderId}...`)
}

const fetchOrders = () => {
  toast.success('Orders refreshed!')
}
</script>
