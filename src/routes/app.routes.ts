import { createMemoryHistory, createRouter } from 'vue-router'
import ViewPokemon from '@/components/pages/viewPokemon.vue'

const routes = [
  { 
    path: '/', 
    component: ViewPokemon
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})