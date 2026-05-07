<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Profile Settings</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Manage your account information and preferences.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
          Cancel
        </button>
        <button class="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Profile Card -->
      <div class="lg:col-span-1 space-y-6">
        <div class="glass p-6 rounded-3xl shadow-sm space-y-6">
          <div class="flex flex-col items-center text-center">
            <div class="relative group">
              <div class="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <img :src="user.avatar" alt="Profile" class="w-full h-full object-cover" />
              </div>
              <button class="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <h3 class="mt-4 text-xl font-bold text-slate-900 dark:text-white">{{ user.name }}</h3>
            <p class="text-sm text-slate-500 font-medium">{{ user.role }}</p>
          </div>

          <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
             <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500">Status</span>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] font-bold uppercase rounded-lg">Active</span>
             </div>
             <div class="flex items-center justify-between text-sm">
                <span class="text-slate-500">Member since</span>
                <span class="text-slate-900 dark:text-white font-medium">Jan 2024</span>
             </div>
          </div>
        </div>

        <div class="glass p-6 rounded-3xl shadow-sm">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Security Strength</h4>
          <div class="space-y-2">
            <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
               <div class="h-full bg-blue-500 w-[85%]"></div>
            </div>
            <p class="text-[10px] text-slate-500 font-medium">Your account security is 85%. Add two-factor authentication to reach 100%.</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Settings Forms -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Information -->
        <div class="glass p-8 rounded-3xl shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Personal Information</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
              <input v-model="user.name" type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
              <input v-model="user.email" type="email" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Phone Number</label>
              <input v-model="user.phone" type="text" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Role</label>
              <input v-model="user.role" type="text" disabled class="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 cursor-not-allowed" />
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Bio</label>
            <textarea v-model="user.bio" rows="4" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 dark:text-white resize-none"></textarea>
          </div>
        </div>

        <!-- Preferences -->
        <div class="glass p-8 rounded-3xl shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
               </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">System Preferences</h3>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50">
               <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">Email Notifications</p>
                  <p class="text-xs text-slate-500">Receive weekly reports and security alerts</p>
               </div>
               <button class="w-12 h-6 rounded-full bg-blue-600 relative transition-colors shadow-inner">
                  <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
               </button>
            </div>
            <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50">
               <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication</p>
                  <p class="text-xs text-slate-500">Add an extra layer of security to your account</p>
               </div>
               <button class="w-12 h-6 rounded-full bg-slate-300 dark:bg-slate-700 relative transition-colors">
                  <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  name: 'Fardin Ahsan',
  email: 'fardin@example.com',
  phone: '+1 (555) 000-0000',
  role: 'Super Admin',
  avatar: 'https://ui-avatars.com/api/?name=Fardin+Ahsan&background=3b82f6&color=fff&size=512',
  bio: 'Lead developer at TechNest. Passionate about building modern, scalable web applications with Vue and Tailwind CSS.'
})
</script>
