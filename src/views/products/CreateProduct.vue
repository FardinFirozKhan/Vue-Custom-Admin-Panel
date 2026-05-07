<template>
  <div class="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
    <div class="flex items-center gap-4">
      <router-link to="/products" class="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </router-link>
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Create New Product</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Fill in the details below to add a new product to your inventory.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-6">
        <!-- Basic Information -->
        <div class="glass p-8 rounded-3xl shadow-sm border-white/40 dark:border-slate-700/50 space-y-6">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Basic Information</h3>
          
          <div class="space-y-2">
            <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Product Name</label>
            <input type="text" placeholder="e.g. MacBook Pro 16-inch" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Category</label>
              <select class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none">
                <option>Electronics</option>
                <option>Accessories</option>
                <option>Software</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Brand</label>
              <input type="text" placeholder="e.g. Apple" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Description</label>
            <textarea rows="6" placeholder="Describe the product features and specifications..." class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"></textarea>
          </div>
        </div>

        <!-- Pricing & Inventory -->
        <div class="glass p-8 rounded-3xl shadow-sm border-white/40 dark:border-slate-700/50 space-y-6">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Pricing & Inventory</h3>
          
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Price ($)</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">$</span>
                <input type="number" placeholder="0.00" class="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Sale Price ($)</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">$</span>
                <input type="number" placeholder="0.00" class="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">SKU</label>
              <input type="text" placeholder="APL-MBP-16" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Stock Quantity</label>
              <input type="number" placeholder="0" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Media & Publish -->
      <div class="space-y-6">
        <!-- Media Upload -->
        <div class="glass p-8 rounded-3xl shadow-sm border-white/40 dark:border-slate-700/50 space-y-6">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Product Media</h3>
          <div class="aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-6 text-center group hover:border-blue-500 transition-colors cursor-pointer">
            <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <p class="text-sm font-bold text-slate-900 dark:text-white">Click to upload</p>
            <p class="text-xs text-slate-500 mt-1">or drag and drop images here</p>
          </div>
          <p class="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">Recommended: 1000x1000px</p>
        </div>

        <!-- Publish Card -->
        <div class="glass p-8 rounded-3xl shadow-sm border-white/40 dark:border-slate-700/50 space-y-6">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Publishing</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400">Status</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-bold uppercase">Draft</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400">Visibility</span>
              <span class="text-sm font-bold text-slate-900 dark:text-white">Public</span>
            </div>
          </div>
          <div class="pt-6 space-y-3">
            <button class="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
              Save & Publish
            </button>
            <button class="w-full px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Form logic would go here
</script>
