<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const themeStore = useThemeStore()
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">CRM Prospection</h1>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <RouterLink
              to="/prospects"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100"
              active-class="border-b-2 border-primary-500"
            >
              Prospects
            </RouterLink>
            <RouterLink
              to="/team"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100"
              active-class="border-b-2 border-primary-500"
            >
              Équipe
            </RouterLink>
          </div>
        </div>
        <div class="flex items-center">
          <button
            @click="themeStore.toggleTheme"
            class="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <SunIcon v-if="themeStore.isDark" class="h-6 w-6" />
            <MoonIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>