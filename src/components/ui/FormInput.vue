<template>
  <div class="space-y-2 w-full">
    <div class="flex justify-between items-center ml-1">
      <label v-if="label" class="text-sm font-semibold text-slate-600 dark:text-slate-400">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <span v-if="error" class="text-[10px] font-bold text-red-500 uppercase tracking-wider animate-in fade-in">{{ error }}</span>
    </div>
    
    <div class="relative group">
      <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <slot name="icon"></slot>
      </div>
      
      <input 
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full transition-all duration-300 outline-none rounded-2xl bg-slate-50 dark:bg-slate-800 border"
        :class="[
          error 
            ? 'border-red-200 dark:border-red-900/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
            : 'border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
          $slots.icon ? 'pl-11 pr-4' : 'px-4',
          'py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400'
        ]"
      />
    </div>
    
    <p v-if="helpText && !error" class="text-[10px] text-slate-400 ml-1 font-medium italic">{{ helpText }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: [String, Number],
  error: String,
  helpText: String,
  required: Boolean
})

defineEmits(['update:modelValue'])
</script>
