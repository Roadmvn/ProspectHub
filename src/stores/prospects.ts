import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  siret: string
  tags: string[]
  location: string
  status: 'Prospect' | 'Client' | 'Contact'
  followUpStatus: string
  nextFollowUp: string
  assignedTo: string
}

export const useProspectsStore = defineStore('prospects', () => {
  const prospects = ref<Prospect[]>([
    {
      id: '1',
      name: 'Entreprise ABC',
      email: 'contact@abc.com',
      phone: '01 23 45 67 89',
      siret: '123 456 789 00012',
      tags: ['Vêtement'],
      location: '75001 Paris',
      status: 'Prospect',
      followUpStatus: 'Devis à envoyer',
      nextFollowUp: '2024-04-01',
      assignedTo: 'Jean Dupont'
    },
    {
      id: '2',
      name: 'Restaurant XYZ',
      email: 'info@xyz.fr',
      phone: '04 56 78 90 12',
      siret: '987 654 321 00011',
      tags: ['Restaurant'],
      location: '69001 Lyon',
      status: 'Client',
      followUpStatus: 'Suivi régulier',
      nextFollowUp: '2024-03-25',
      assignedTo: 'Marie Martin'
    }
  ])

  function addProspect(prospect: Omit<Prospect, 'id'>) {
    prospects.value.push({
      ...prospect,
      id: Math.random().toString(36).substr(2, 9)
    })
  }

  function updateProspect(id: string, updates: Partial<Prospect>) {
    const index = prospects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      prospects.value[index] = { ...prospects.value[index], ...updates }
    }
  }

  function deleteProspect(id: string) {
    prospects.value = prospects.value.filter(p => p.id !== id)
  }

  return {
    prospects,
    addProspect,
    updateProspect,
    deleteProspect
  }
})