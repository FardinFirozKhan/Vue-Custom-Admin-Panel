<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Real-time Analytics</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Live data visualization using real components.</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="showExportToast" class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          Generate Report
        </button>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="glass p-8 rounded-[2.5rem] shadow-sm">
        <h3 class="text-xl font-bold mb-6">Revenue Growth</h3>
        <LineChart :chart-data="revenueData" :height="300" />
      </div>
      <div class="glass p-8 rounded-[2.5rem] shadow-sm">
        <h3 class="text-xl font-bold mb-6">Sales by Category</h3>
        <BarChart :chart-data="salesData" :height="300" />
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="glass p-8 rounded-[2.5rem] shadow-sm">
        <h3 class="text-xl font-bold mb-6">Device Distribution</h3>
        <PieChart :chart-data="deviceData" :height="250" />
      </div>
      
      <div class="lg:col-span-2 space-y-6">
        <div class="glass p-8 rounded-[2.5rem] shadow-sm">
          <Tabs :tabs="[
            { label: 'Overview', value: 'overview' },
            { label: 'Security', value: 'security' },
            { label: 'Billing', value: 'billing' }
          ]">
            <template #default="{ activeTab }">
              <div v-if="activeTab === 'overview'" class="space-y-4">
                <p class="text-sm text-slate-500">System overview and health status.</p>
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p class="text-xs font-bold text-slate-400 uppercase">Uptime</p>
                    <p class="text-lg font-black text-blue-500">99.98%</p>
                  </div>
                  <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p class="text-xs font-bold text-slate-400 uppercase">Response Time</p>
                    <p class="text-lg font-black text-purple-500">124ms</p>
                  </div>
                </div>
              </div>
              <div v-if="activeTab === 'security'">
                <Accordion :items="[
                  { title: 'Firewall Status', content: 'The system firewall is active and monitoring all incoming traffic on ports 80 and 443.' },
                  { title: 'SSL Certificates', content: 'Your SSL certificates are valid and will expire in 245 days. Auto-renewal is enabled.' },
                  { title: 'Recent Threats', content: 'No significant threats detected in the last 24 hours. 12 minor probes were blocked.' }
                ]" />
              </div>
              <div v-if="activeTab === 'billing'" class="text-center py-8">
                <button @click="isModalOpen = true" class="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-all">
                  Open Billing Modal
                </button>
              </div>
            </template>
          </Tabs>
        </div>
      </div>
    </div>

    <!-- Billing Modal -->
    <Modal :is-open="isModalOpen" title="Billing Details" @close="isModalOpen = false">
      <div class="space-y-6">
        <FormInput 
          label="Cardholder Name" 
          v-model="billingForm.name" 
          placeholder="e.g. John Doe"
          :error="billingForm.name.length < 3 ? 'Name is too short' : ''"
        />
        <FormInput 
          label="Card Number" 
          v-model="billingForm.card" 
          placeholder="0000 0000 0000 0000"
          help-text="Your data is encrypted and secure."
        >
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          </template>
        </FormInput>
      </div>
      <template #footer>
        <button @click="isModalOpen = false" class="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
        <button @click="handlePayment" class="px-6 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">Process Payment</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import LineChart from '@/components/ui/Charts/LineChart.vue'
import BarChart from '@/components/ui/Charts/BarChart.vue'
import PieChart from '@/components/ui/Charts/PieChart.vue'
import Tabs from '@/components/ui/Tabs.vue'
import Accordion from '@/components/ui/Accordion.vue'
import Modal from '@/components/ui/Modal.vue'
import FormInput from '@/components/ui/FormInput.vue'

const toast = useToast()
const isModalOpen = ref(false)
const billingForm = ref({ name: '', card: '' })

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue',
    data: [3000, 4500, 4200, 6000, 7800, 8200],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true,
    borderWidth: 3,
  }]
}

const salesData = {
  labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Toys'],
  datasets: [{
    label: 'Sales',
    data: [65, 45, 30, 20, 10],
    backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'],
    borderRadius: 8,
  }]
}

const deviceData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [{
    data: [60, 30, 10],
    backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b'],
    borderWidth: 0,
  }]
}

const showExportToast = () => {
  toast.success('Report generation started...', 4000)
}

const handlePayment = () => {
  isModalOpen.value = false
  toast.success('Payment processed successfully!')
}
</script>
