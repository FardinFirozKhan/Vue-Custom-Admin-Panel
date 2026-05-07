# TechNest - Premium Vue 3 Admin Panel

TechNest is a state-of-the-art, high-performance admin dashboard built with **Vue 3**, **Vite**, and **Tailwind CSS**. Designed for developers who demand premium aesthetics and robust functionality, it features a glassmorphism-inspired UI, smooth animations, and a rich library of reusable functional components.

![TechNest Dashboard](https://raw.githubusercontent.com/FardinFirozKhan/Vue-Custom-Admin-Panel/main/public/preview-mockup.png)

## 📸 Visual Showcase

| | |
|:---:|:---:|
| ![Dashboard](./public/screenshots/screen-1.png) | ![Analytics](./public/screenshots/screen-2.png) |
| ![User Management](./public/screenshots/screen-3.png) | ![Product Inventory](./public/screenshots/screen-4.png) |
| ![Order Tracking](./public/screenshots/screen-5.png) | ![Settings](./public/screenshots/screen-6.png) |
| ![Dark Mode Support](./public/screenshots/screen-7.png) | ![Mobile Responsive](./public/screenshots/screen-8.png) |
| ![Form Validation](./public/screenshots/screen-9.png) | ![Chart Interactivity](./public/screenshots/screen-10.png) |
| ![Side Panels](./public/screenshots/screen-11.png) | ![Toast Notifications](./public/screenshots/screen-12.png) |

## ✨ Features

- **💎 Premium Glassmorphism UI**: A stunning, modern design with backdrop blurs, subtle gradients, and sleek dark mode support.
- **🚀 High Performance**: Built on Vite for lightning-fast development and optimized production builds.
- **📈 Live Analytics**: Integrated **Chart.js** for real-time data visualization (Line, Bar, and Doughnut charts).
- **📋 Advanced Data Tables**: Reusable `DataTable` component with built-in search, pagination, and custom slots.
- **🔔 Global Toast System**: A functional, high-performance notification system with a dedicated composable.
- **✨ Smooth Transitions**: Professional entrance animations and side-panel transitions using Vue's `<Transition>` system and custom cubic-bezier curves.
- **📱 Fully Responsive**: Optimized for all screen sizes, from mobile devices to large desktop monitors.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [Vue-Chartjs](https://vue-chartjs.org/)
- **Icons**: Custom SVG Icon System

## 📂 Project Structure

```text
src/
├── components/
│   ├── ui/             # Reusable functional components (DataTable, Modal, Toast, etc.)
│   ├── layout/         # Sidebar, Navbar, and Main Layout
│   └── icons/          # Custom SVG icon library
├── views/              # Page modules (Dashboard, Users, Products, Analytics, etc.)
├── composables/        # Reusable logic (useToast, etc.)
├── router/             # Vue Router configuration
└── style.css           # Global styles and custom animations
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/FardinFirozKhan/Vue-Custom-Admin-Panel.git
cd Vue-Custom-Admin-Panel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## 🧩 Key Components

### DataTable
A powerful component for listing data.
```vue
<DataTable :columns="myColumns" :data="myData" :has-actions="true">
  <template #col-status="{ item }">
    <span class="badge">{{ item.status }}</span>
  </template>
</DataTable>
```

### Toast Notifications
Use the global toast system from any component.
```javascript
import { useToast } from '@/composables/useToast'
const toast = useToast()

toast.success('Settings saved successfully!')
```

### SidePanel & Modal
Smooth, high-value dialog components for CRUD operations.
```vue
<SidePanel :is-open="isOpen" title="Add User" @close="isOpen = false">
  <!-- Your Form Here -->
</SidePanel>
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Fardin Khan](https://github.com/FardinFirozKhan)
