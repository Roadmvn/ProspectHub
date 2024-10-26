<script setup lang="ts">
import { ref } from 'vue'
import { useProspectsStore, type Prospect } from '../stores/prospects'
import { useTeamStore } from '../stores/team'

const props = defineProps<{
  prospect?: Prospect
}>()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const store = useProspectsStore()
const teamStore = useTeamStore()

const name = ref(props.prospect?.name ?? '')
const email = ref(props.prospect?.email ?? '')
const phone = ref(props.prospect?.phone ?? '')
const siret = ref(props.prospect?.siret ?? '')
const tags = ref(props.prospect?.tags ?? [])
const location = ref(props.prospect?.location ?? '')
const status = ref(props.prospect?.status ?? 'Prospect')
const followUpStatus = ref(props.prospect?.followUpStatus ?? '')
const nextFollowUp = ref(props.prospect?.nextFollowUp ?? '')
const assignedTo = ref(props.prospect?.assignedTo ?? '')

const tagInput = ref('')

const addTag = () => {
  if (tagInput.value && !tags.value.includes(tagInput.value)) {
    tags.value.push(tagInput.value)
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag)
}

const formatSiret = (value: string) => {
  const numbers = value.replace(/[^\d]/g, '')
  const groups = numbers.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,5})/)
  if (!groups) return value
  return groups
    .slice(1)
    .filter(Boolean)
    .join(' ')
}

const handleSiretInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const formatted = formatSiret(input.value)
  siret.value = formatted
}

const save = () => {
  const prospectData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    siret: siret.value,
    tags: tags.value,
    location: location.value,
    status: status.value as 'Prospect' | 'Client' | 'Contact',
    followUpStatus: followUpStatus.value,
    nextFollowUp: nextFollowUp.value,
    assignedTo: assignedTo.value,
  }

  if (props.prospect) {
    store.updateProspect(props.prospect.id, prospectData)
  } else {
    store.addProspect(prospectData)
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
      <label for="siret" class="block text-sm font-medium text-gray-700 dark:text-gray-200">SIRET</label>
      <input
        type="text"
        id="siret"
        v-model="siret"
        @input="handleSiretInput"
        maxlength="17"
        required
        class="input"
        placeholder="123 456 789 00012"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
        class="input"
      />
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Téléphone</label>
      <input
        type="tel"
        id="phone"
        v-model="phone"
        required
        class="input"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Étiquettes</label>
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        >
          {{ tag }}
          <button type="button" @click="removeTag(tag)" class="ml-1">&times;</button>
        </span>
      </div>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="tagInput"
          class="input"
          placeholder="Ajouter une étiquette"
          @keyup.enter.prevent="addTag"
        />
        <button type="button" @click="addTag" class="btn-secondary">Ajouter</button>
      </div>
    </div>

    <div>
      <label for="location" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Lieu</label>
      <input
        type="text"
        id="location"
        v-model="location"
        required
        class="input"
      />
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Status</label>
      <select id="status" v-model="status" required class="input">
        <option value="Prospect">Prospect</option>
        <option value="Client">Client</option>
        <option value="Contact">Contact</option>
      </select>
    </div>

    <div>
      <label for="followUpStatus" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Statut de suivi</label>
      <input
        type="text"
        id="followUpStatus"
        v-model="followUpStatus"
        required
        class="input"
      />
    </div>

    <div>
      <label for="nextFollowUp" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Prochaine relance</label>
      <input
        type="date"
        id="nextFollowUp"
        v-model="nextFollowUp"
        required
        class="input"
      />
    </div>

    <div>
      <label for="assignedTo" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Assigné à</label>
      <select id="assignedTo" v-model="assignedTo" required class="input">
        <option v-for="member in teamStore.team" :key="member.id" :value="member.name">
          {{ member.name }}
        </option>
      </select>
    </div>

    <div class="flex justify-end gap-3 mt-6">
      <button type="button" class="btn-secondary" @click="emit('close')">Annuler</button>
      <button type="submit" class="btn">Enregistrer</button>
    </div>
  </form>
</template>