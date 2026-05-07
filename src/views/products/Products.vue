<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Product Inventory</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Manage your products, pricing, and stock levels.</p>
      </div>
      <button 
        @click="openCreateModal"
        class="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-lg shadow-purple-500/20 transition-all font-bold text-sm"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New Product
      </button>
    </div>

    <DataTable 
      :columns="columns" 
      :data="products" 
      :has-actions="true"
      @refresh="fetchProducts"
    >
      <template #col-name="{ item }">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
            <img :src="item.image" class="w-full h-full object-cover" />
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white">{{ item.name }}</div>
            <div class="text-xs text-slate-500">{{ item.category }}</div>
          </div>
        </div>
      </template>

      <template #col-price="{ item }">
        <span class="font-black text-slate-900 dark:text-white">${{ item.price.toLocaleString() }}</span>
      </template>

      <template #col-stock="{ item }">
        <div class="flex flex-col gap-1 w-24">
          <div class="flex justify-between text-[10px] font-bold">
            <span :class="item.stock < 20 ? 'text-red-500' : 'text-slate-500'">{{ item.stock }} in stock</span>
          </div>
          <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-1000"
              :class="item.stock < 20 ? 'bg-red-500' : 'bg-green-500'"
              :style="{ width: Math.min(item.stock, 100) + '%' }"
            ></div>
          </div>
        </div>
      </template>

      <template #actions="{ item }">
        <button @click="editProduct(item)" class="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="deleteProduct(item)" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </template>
    </DataTable>

    <SidePanel 
      :is-open="isPanelOpen" 
      :title="isEditing ? 'Edit Product' : 'Add New Product'"
      max-width-class="max-w-xl"
      @close="closePanel"
    >
      <form @submit.prevent="saveProduct" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Product Name</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none" />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Category</label>
            <select v-model="form.category" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none">
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Price ($)</label>
            <input v-model.number="form.price" type="number" required class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Stock Quantity</label>
          <input v-model.number="form.stock" type="number" required class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none" />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Description</label>
          <textarea v-model="form.description" rows="4" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none resize-none"></textarea>
        </div>

        <div class="pt-8 flex gap-3">
          <button type="button" @click="closePanel" class="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            Cancel
          </button>
          <button type="submit" class="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all">
            {{ isEditing ? 'Update Product' : 'Create Product' }}
          </button>
        </div>
      </form>
    </SidePanel>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import DataTable from '@/components/ui/DataTable.vue'
import SidePanel from '@/components/ui/SidePanel.vue'

const columns = [
  { key: 'name', label: 'Product' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'category', label: 'Category' }
]

const products = ref([
  { id: 1, name: 'MacBook Pro 16"', category: 'Hardware', price: 2499, stock: 45, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'Sony WH-1000XM4', category: 'Accessories', price: 349, stock: 12, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: 'Logitech MX Master 3', category: 'Accessories', price: 99, stock: 85, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=200' },
  { id: 4, name: 'Dell UltraSharp 32"', category: 'Hardware', price: 899, stock: 5, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=200' },
  { id: 5, name: 'Keychron K2 V2', category: 'Accessories', price: 79, stock: 30, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=200' },
])

const isPanelOpen = ref(false)
const isEditing = ref(false)
const form = reactive({
  id: null,
  name: '',
  category: 'Electronics',
  price: 0,
  stock: 0,
  description: ''
})

const openCreateModal = () => {
  isEditing.value = false
  Object.assign(form, { id: null, name: '', category: 'Electronics', price: 0, stock: 0, description: '' })
  isPanelOpen.value = true
}

const editProduct = (product) => {
  isEditing.value = true
  Object.assign(form, product)
  isPanelOpen.value = true
}

const closePanel = () => {
  isPanelOpen.value = false
}

const saveProduct = () => {
  if (isEditing.value) {
    const index = products.value.findIndex(p => p.id === form.id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...form }
    }
  } else {
    products.value.unshift({
      ...form,
      id: Date.now(),
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'
    })
  }
  closePanel()
}

const deleteProduct = (product) => {
  if (confirm(`Are you sure you want to delete ${product.name}?`)) {
    products.value = products.value.filter(p => p.id !== product.id)
  }
}

const fetchProducts = () => {
  console.log('Refreshing product data...')
}
</script>
