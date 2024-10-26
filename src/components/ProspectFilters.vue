<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTeamStore } from '../stores/team'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: {
    search: string
    assignedTo: string
    status: string
    tag: string
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

const teamStore = useTeamStore()

const filters = ref(props.modelValue)

watch(filters, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          v-model="filters.search"
          placeholder="Rechercher..."
          class="input pl-10"
        />
      </div>

      <select v-model="filters.assignedTo" class="input">
        <option value="">Tous les prospecteurs</option>
        <option v-for="member in teamStore.team" :key="member.id" :value="member.name">
          {{ member.name }}
        </option>
      </select>

      <select v-model="filters.status" class="input">
        <option value="">Tous les statuts</option>
        <option value="Prospect">Prospect</option>
        <option value="Client">Client</option>
        <option value="Contact">Contact</option>
      </select>

      <select v-model="filters.tag" class="input">
        <option value="">Toutes les étiquettes</option>
        <option value="Vêtement">Vêtement</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Location">Location</option>
      </select>
    </div>
  </div>
</template>