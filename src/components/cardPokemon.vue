<template>
  <div v-if="state" class="pokemon-card rounded-[10%] p-5 flex flex-col items-center text-center relative overflow-hidden">
    <div class="w-full aspect-square relative flex items-center justify-center bg-cyan-100 rounded-[15%] p-6">
      <img class="w-full h-full object-contain z-10 drop-shadow-xl bg-radial from-blue-100 from-10% via-blue-800 via-60% to-gray-900 to-90% rounded-[20%]" :src="pokemonData.sprites.front_default"/>
    </div>
    <span class="text-xl font-bold capitalize font-mono py-5">
      {{ pokemonData.name }}
    </span>
    <div class="flex gap-5 mt-sm font-serif">
      <span class="type-badge-fire px-4 py-1 rounded-full text-white font-label-sm uppercase tracking-wider">
        Fire
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardPokemon",
  props: {
    PokeResultData: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getDataPokemonAPI();
  },
  data() {
    return {
      pokemonData: Object,
      state: false,
    };
  },
  methods: {
    async getDataPokemonAPI() {
      await this.axios
        .get(this.PokeResultData.url)
        .then((response) => {
          this.pokemonData = response.data;
          this.state = true;
          //console.log(this.pokemonData.sprites.front_default);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid black;
}
</style>
