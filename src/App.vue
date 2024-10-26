<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import { useThemeStore } from './stores/theme'
import './style.css'

const themeStore = useThemeStore()
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <Navigation />
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>