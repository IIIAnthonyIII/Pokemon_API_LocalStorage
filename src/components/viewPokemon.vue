<template>
  <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    <template v-for="(pokemon) in PokeResultAPI" :key="pokemon.name">
        <CardPokemon :PokeResultData="pokemon"/>
    </template>
  </div>
</template>

<script>
import CardPokemon from "./cardPokemon.vue";

export default {
  name: "ViewPokemon",
  props: {
    PokeResultAPI: {
      type: Array,
      required: true,
    },
  },
  components: {
    CardPokemon,
  },
};
</script>
