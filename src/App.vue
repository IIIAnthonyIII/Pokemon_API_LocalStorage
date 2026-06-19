<template>
  <div>
    <div class="flex items-center justify-center gap-10 py-4">
      <img src="./assets/LogoPokemon.png" alt="Logo-Poke" width="220" height="100" >
      <img src="./assets/logo.svg" alt="Vue logo"  width="70" height="100">
    </div>
    <div v-if="state" class="flex-block items-center justify-center">
      <ViewPokemon :PokeResultAPI="pokemonesApi.results"/>
      <PaginationPokemon v-if="showPagination" 
        v-on:goHome="getAllPokemonsAPI" 
        v-on:goToPage="getPokemonsByPagination"/>
      <div class="flex items-center justify-center">
        <span class="p-2 text-label-sm text-on-surface-variant">Showing 1-20 of {{ pokemonCount }} Pokémon</span>
      </div>
    </div>
  </div>
</template>

<script>
import ViewPokemon from './components/viewPokemon.vue'
import PaginationPokemon from './components/paginationPokemon.vue'
import Env from './environment/env.ts'

export default {
  name: 'App',
  components: {
    ViewPokemon,
    PaginationPokemon,
  },
  mounted() {
    this.getAllPokemonsAPI();
    this.setShowPagination(true);
  },
  data() {
    return {
      pokemonesApi:[],
      state: false,
      pokemonCount: 0,
    }
  },
  methods: {
    async getAllPokemonsAPI(){
      await this.axios.get(Env.apiUrl).then(response =>{
        this.pokemonesApi = response.data;
        this.pokemonCount = response.data.count;
        this.state = true;
        console.log(response);
      }).catch(error=>{
        console.log(error);
      })
    },
    setShowPagination(state){
      this.showPagination = state;
    },
    async getPokemonsByPagination(pagination){
      var offset = pagination*20; //Offset variable para buscar por GET en la API
      if(offset == 0){
        offset = "0";
      }
      await this.axios.get(`${Env.apiUrl}?offset=${offset}&limit=20`).then(response =>{
        this.pokemonesApi = response.data;
        console.log(response);
      }).catch(error=>{
        console.log(error);
      })
    },
  },
}
</script>