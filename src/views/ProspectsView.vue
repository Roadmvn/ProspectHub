<script setup lang="ts">
import { ref, computed } from 'vue'
import ProspectTable from '../components/ProspectTable.vue'
import ProspectForm from '../components/ProspectForm.vue'
import ProspectFilters from '../components/ProspectFilters.vue'
import Modal from '../components/Modal.vue'
import { useProspectsStore, type Prospect } from '../stores/prospects'

const store = useProspectsStore()
const showForm = ref(false)
const editingProspect = ref<Prospect | null>(null)

const filters = ref({
  search: '',
  assignedTo: '',
  status: '',
  tag: ''
})

const filteredProspects = computed(() => {
  return store.prospects.filter(prospect => {
    const matchesSearch = !filters.value.search || 
      prospect.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      prospect.email.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      prospect.siret.includes(filters.value.search)
    
    const matchesAssignedTo = !filters.value.assignedTo || 
      prospect.assignedTo === filters.value.assignedTo
    
    const matchesStatus = !filters.value.status || 
      prospect.status === filters.value.status
    
    const matchesTag = !filters.value.tag || 
      prospect.tags.includes(filters.value.tag)

    return matchesSearch && matchesAssignedTo && matchesStatus && matchesTag
  })
})

const handleEdit = (prospect: Prospect) => {
  editingProspect.value = prospect
  showForm.value = true
}

const handleClose = () => {
  showForm.value = false
  editingProspect.value = null
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Prospects et Clients</h1>
      <button class="btn" @click="showForm = true">
        Ajouter un prospect
      </button>
    </div>

    <ProspectFilters v-model="filters" />

    <ProspectTable :prospects="filteredProspects" @edit="handleEdit" />

    <Modal
      :show="showForm"
      :title="editingProspect ? 'Modifier le prospect' : 'Ajouter un prospect'"
      @close="handleClose"
    >
      <ProspectForm
        :prospect="editingProspect ?? undefined"
        @close="handleClose"
        @saved="handleClose"
      />
    </Modal>
  </div>
</template>