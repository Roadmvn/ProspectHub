<script setup lang="ts">
import { ref } from 'vue'
import { useTeamStore, type TeamMember } from '../stores/team'

const props = defineProps<{
  member?: TeamMember
}>()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const store = useTeamStore()

const name = ref(props.member?.name ?? '')
const role = ref(props.member?.role ?? 'Prospecteur')
const clientCount = ref(props.member?.clientCount ?? 0)
const prospectCount = ref(props.member?.prospectCount ?? 0)
const cdv = ref(props.member?.cdv ?? 0)

const save = () => {
  const memberData = {
    name: name.value,
    role: role.value as 'Lead Prospect' | 'Co-founder' | 'Prospecteur',
    clientCount: Number(clientCount.value),
    prospectCount: Number(prospectCount.value),
    cdv: Number(cdv.value)
  }

  if (props.member) {
    store.updateMember(props.member.id, memberData)
  } else {
    store.addMember(memberData)
  }

  emit('saved')
  emit('close')
}
</script>

<template>
  <form @submit.prevent="save" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom</label>
      <input
        type="text"
        id="name"
        v-model="name"
        required
        class="input"
      />
    </div>

    <div>
      <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Rôle</label>
      <select id="role" v-model="role" required class="input">
        <option value="Lead Prospect">Lead Prospect</option>
        <option value="Co-founder">Co-founder</option>
        <option value="Prospecteur">Prospecteur</option>
      </select>
    </div>

    <div>
      <label for="clientCount" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Nombre de clients</label>
      <input
        type="number"
        id="clientCount"
        v-model="clientCount"
        min="0"
        required
        class="input"
      />
    </div>

    <div>
      <label for="prospectCount" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Nombre de prospects</label>
      <input
        type="number"
        id="prospectCount"
        v-model="prospectCount"
        min="0"
        required
        class="input"
      />
    </div>

    <div>
      <label for="cdv" class="block text-sm font-medium text-gray-700 dark:text-gray-200">CDV (€)</label>
      <input
        type="number"
        id="cdv"
        v-model="cdv"
        min="0"
        required
        class="input"
      />
    </div>

    <div class="flex justify-end gap-3 mt-6">
      <button type="button" class="btn-secondary" @click="emit('close')">Annuler</button>
      <button type="submit" class="btn">Enregistrer</button>
    </div>
  </form>
</template>