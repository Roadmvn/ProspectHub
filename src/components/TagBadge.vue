<script setup lang="ts">
const props = defineProps<{
  tag: string
}>()

const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'vêtement':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case 'restaurant':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'location':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}
</script>

<template>
  <span class="badge" :class="getTagColor(tag)">
    {{ tag }}
  </span>
</template>