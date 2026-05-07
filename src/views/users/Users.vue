<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">User Management</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Manage your team members and their account permissions.</p>
      </div>
      <button 
        @click="openCreateModal"
        class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20 transition-all font-bold text-sm"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New User
      </button>
    </div>

    <DataTable 
      :columns="columns" 
      :data="users" 
      :has-actions="true"
      @refresh="fetchUsers"
    >
      <template #col-name="{ item }">
        <div class="flex items-center gap-3">
          <img :src="item.avatar" class="w-10 h-10 rounded-xl object-cover" />
          <div>
            <div class="font-bold text-slate-900 dark:text-white">{{ item.name }}</div>
            <div class="text-xs text-slate-500">{{ item.email }}</div>
          </div>
        </div>
      </template>

      <template #col-status="{ item }">
        <span 
          :class="item.status === 'Active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800'"
          class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase"
        >
          {{ item.status }}
        </span>
      </template>

      <template #actions="{ item }">
        <button @click="editUser(item)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="deleteUser(item)" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </template>
    </DataTable>

    <SidePanel 
      :is-open="isPanelOpen" 
      :title="isEditing ? 'Edit User' : 'Add New User'"
      @close="closePanel"
    >
      <form @submit.prevent="saveUser" class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Full Name</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Email Address</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Role</label>
          <select v-model="form.role" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none">
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">Status</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="radio" v-model="form.status" value="Active" class="w-4 h-4 text-blue-600 focus:ring-blue-500" />
              <span class="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Active</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="radio" v-model="form.status" value="Inactive" class="w-4 h-4 text-blue-600 focus:ring-blue-500" />
              <span class="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Inactive</span>
            </label>
          </div>
        </div>

        <div class="pt-8 flex gap-3">
          <button type="button" @click="closePanel" class="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            Cancel
          </button>
          <button type="submit" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
            {{ isEditing ? 'Update User' : 'Create User' }}
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
  { key: 'name', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastLogin', label: 'Last Login' }
]

const users = ref([
  { id: 1, name: 'Alex Thompson', email: 'alex@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', avatar: 'https://ui-avatars.com/api/?name=Alex+Thompson&background=random' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=random' },
  { id: 3, name: 'Michael Ross', email: 'michael@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2 days ago', avatar: 'https://ui-avatars.com/api/?name=Michael+Ross&background=random' },
  { id: 4, name: 'Elena Rodriguez', email: 'elena@example.com', role: 'Admin', status: 'Active', lastLogin: 'Just now', avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random' },
  { id: 5, name: 'David Kim', email: 'david@example.com', role: 'Editor', status: 'Active', lastLogin: '1 day ago', avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=random' },
])

const isPanelOpen = ref(false)
const isEditing = ref(false)
const form = reactive({
  id: null,
  name: '',
  email: '',
  role: 'Viewer',
  status: 'Active'
})

const openCreateModal = () => {
  isEditing.value = false
  Object.assign(form, { id: null, name: '', email: '', role: 'Viewer', status: 'Active' })
  isPanelOpen.value = true
}

const editUser = (user) => {
  isEditing.value = true
  Object.assign(form, user)
  isPanelOpen.value = true
}

const closePanel = () => {
  isPanelOpen.value = false
}

const saveUser = () => {
  if (isEditing.value) {
    const index = users.value.findIndex(u => u.id === form.id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...form }
    }
  } else {
    users.value.unshift({
      ...form,
      id: Date.now(),
      lastLogin: 'Never',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=random`
    })
  }
  closePanel()
}

const deleteUser = (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    users.value = users.value.filter(u => u.id !== user.id)
  }
}

const fetchUsers = () => {
  // Simulate refresh
  console.log('Refreshing user data...')
}
</script>
