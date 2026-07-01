<template v-if="state">
  <div  class="pokemon-card rounded-[10%] p-5 flex flex-col items-center text-center relative overflow-hidden">
    <div class="w-full aspect-square relative flex items-center justify-center bg-cyan-100 rounded-[15%] p-6">
      <img class="w-full h-full object-contain z-10 drop-shadow-xl bg-radial from-blue-100 from-10% via-blue-800 via-60% to-gray-900 to-90% rounded-[20%]" :src="image.front_default"/>
    </div>
    <span class="text-xl font-bold capitalize font-mono py-5">
      {{ PokeResultData.name }}
    </span>
    <TagPokemon :TypeResultData="types"/>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { APIResource } from '@/core/interfaces/pokemon.interface';
import pokemonService from "@/core/services/api/pokemonService.ts";
import TagPokemon from "./tagPokemon.vue";

export default {
  name: "CardPokemon",
  components:{
    TagPokemon,
  },
  props: {
    PokeResultData: {
      type: Object as PropType<APIResource>,
      required: true,
    },
  },
  created() {
    this.getDataPokemonAPI();
  },
  data() {
    return {
      types: [] as any,
      image: Object as any,
      state: false,
    };
  },
  methods: {
    async getDataPokemonAPI() {
      await pokemonService.getDataPokemon(this.PokeResultData.url)
        .then((response) => {
          this.image = response.data.sprites;
          this.types = response.data.types;
          this.state = true;
          console.log(response.data.types);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>