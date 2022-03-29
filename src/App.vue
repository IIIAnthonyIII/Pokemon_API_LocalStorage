<template>
  <img src="./assets/LogoPokemon.png" alt="Logo-Poke" width="320" height="100" class="m-4">
  <img alt="Vue logo" src="./assets/logo.png" width="120" height="100">
  <ViewPokemon />
</template>

<script>
import ViewPokemon from './components/viewPokemon.vue'

export default {
  name: 'App',
  components: {
    ViewPokemon
  },
  mounted() {
    this.getAllPokemonsAPI();
  },
  data() {
    return {
      pokemonesApi:[],
      sizePokemons: 0,
    }
  },
  methods: {
    async getAllPokemonsAPI(){
      await this.axios.get(`https://pokeapi.co/api/v2/pokemon`).then(response =>{
        console.log(response);
        // this.pokemonesApi=results.data;
        // this.sizePokemons=this.pokemones.count;
      }).catch(error=>{
        console.log(error)
      })
    },
  },
}
</script>

<style>
#app{
  text-align: center;
}
</style>
