<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTeamStore, type TeamMember } from '../stores/team'
import Modal from '../components/Modal.vue'
import TeamForm from '../components/TeamForm.vue'

const store = useTeamStore()
const team = computed(() => store.team)

const showForm = ref(false)
const editingMember = ref<TeamMember | null>(null)

const handleEdit = (member: TeamMember) => {
  editingMember.value = member
  showForm.value = true
}

const handleClose = () => {
  showForm.value = false
  editingMember.value = null
}

const handleDelete = (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
    store.deleteMember(id)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Équipe de Prospection</h1>
      <button class="btn" @click="showForm = true">
        Ajouter un membre
      </button>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Rôle</th>
            <th>Clients</th>
            <th>Prospects</th>
            <th>CDV</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in team" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.role }}</td>
            <td>{{ member.clientCount }}</td>
            <td>{{ member.prospectCount }}</td>
            <td>{{ member.cdv.toLocaleString('fr-FR') }} €</td>
            <td>
              <div class="flex gap-2">
                <button class="btn-secondary" @click="handleEdit(member)">
                  Modifier
                </button>
                <button class="btn-secondary text-red-600" @click="handleDelete(member.id)">
                  Supprimer
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal
      :show="showForm"
      :title="editingMember ? 'Modifier le membre' : 'Ajouter un membre'"
      @close="handleClose"
    >
      <TeamForm
        :member="editingMember ?? undefined"
        @close="handleClose"
        @saved="handleClose"
      />
    </Modal>
  </div>
</template>