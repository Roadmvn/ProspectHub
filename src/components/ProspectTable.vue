<script setup lang="ts">
import { type Prospect } from '../stores/prospects'
import StatusBadge from './StatusBadge.vue'
import TagBadge from './TagBadge.vue'

const props = defineProps<{
  prospects: Prospect[]
}>()

const emit = defineEmits<{
  edit: [prospect: Prospect]
}>()

const deleteProspect = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) {
    store.deleteProspect(id)
  }
}
</script>

<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>SIRET</th>
          <th>Contact</th>
          <th>Étiquettes</th>
          <th>Lieu</th>
          <th>Status</th>
          <th>Suivi</th>
          <th>Prochaine relance</th>
          <th>Assigné à</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prospect in prospects" :key="prospect.id">
          <td>{{ prospect.name }}</td>
          <td>{{ prospect.siret }}</td>
          <td>
            <div class="flex flex-col gap-1">
              <a :href="'mailto:' + prospect.email" class="text-primary-600 hover:text-primary-700">
                {{ prospect.email }}
              </a>
              <a :href="'tel:' + prospect.phone" class="text-primary-600 hover:text-primary-700">
                {{ prospect.phone }}
              </a>
            </div>
          </td>
          <td>
            <div class="flex gap-1">
              <TagBadge v-for="tag in prospect.tags" :key="tag" :tag="tag" />
            </div>
          </td>
          <td>{{ prospect.location }}</td>
          <td>
            <StatusBadge :status="prospect.status" />
          </td>
          <td>{{ prospect.followUpStatus }}</td>
          <td>{{ prospect.nextFollowUp }}</td>
          <td>{{ prospect.assignedTo }}</td>
          <td>
            <div class="flex gap-2">
              <button class="btn-secondary" @click="$emit('edit', prospect)">
                Modifier
              </button>
              <button class="btn-secondary text-red-600" @click="deleteProspect(prospect.id)">
                Supprimer
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>