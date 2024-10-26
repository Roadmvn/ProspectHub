import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TeamMember {
  id: string
  name: string
  role: 'Lead Prospect' | 'Co-founder' | 'Prospecteur'
  clientCount: number
  prospectCount: number
  cdv: number
}

export const useTeamStore = defineStore('team', () => {
  const team = ref<TeamMember[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      role: 'Lead Prospect',
      clientCount: 12,
      prospectCount: 25,
      cdv: 85000
    },
    {
      id: '2',
      name: 'Marie Martin',
      role: 'Prospecteur',
      clientCount: 8,
      prospectCount: 15,
      cdv: 45000
    }
  ])

  function addMember(member: Omit<TeamMember, 'id'>) {
    team.value.push({
      ...member,
      id: Math.random().toString(36).substr(2, 9)
    })
  }

  function updateMember(id: string, updates: Partial<TeamMember>) {
    const index = team.value.findIndex(m => m.id === id)
    if (index !== -1) {
      team.value[index] = { ...team.value[index], ...updates }
    }
  }

  function deleteMember(id: string) {
    team.value = team.value.filter(m => m.id !== id)
  }

  return {
    team,
    addMember,
    updateMember,
    deleteMember
  }
})