<template v-if="isLoaded">
  <div clas="flex-block items-center justify-center">
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      <template v-for="(pokemon) in pokemonesApi" :key="pokemon.name">
        <CardPokemon 
          :PokeResultData = "pokemon"
        />
      </template>
    </div>
    <PaginationPokemon
      :PokemonCount = "pokemonCount"
      :Limit = "limit"
      @goHome = "fetchPokemonPage"
      @goToPage = "fetchPokemonPage"
    />
    <div class="flex items-center justify-center">
      <span class="p-2 text-label-sm text-on-surface-variant">
        Showing {{ from }}-{{ to }} of {{ pokemonCount }} Pokémon
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import type { APIResource } from '@/core/interfaces/pokemon.interface';
import CardPokemon from "@/components/shared/cardPokemon.vue";
import pokemonService from "@/core/services/api/pokemonService.ts";
import PaginationPokemon from '@/components/shared/paginationPokemon.vue';

export default {
  name: "ViewPokemon",
  components: {
    CardPokemon,
    PaginationPokemon,
  },
  data() {
    return {
      pokemonesApi: [] as APIResource[],
      typesAPI: [] as APIResource[],
      pokemonCount: 0,
      isLoaded: false,
      limit: 24,
      offset: 0,
    }
  },
  computed: {
    from() {
      return this.offset + 1;
    },
    to() {
      return Math.min(this.offset + this.limit, this.pokemonCount);
    },
  },
  mounted() {
    this.fetchPokemonPage(0);
  },
  methods: {
    async fetchPokemonPage (pageIndex = 0) {
      try {
        const index = pageIndex;
        this.offset = index * this.limit;
        const response = await pokemonService.getPokemonsByPagination(this.offset, this.limit);
        this.pokemonesApi = response.data.results;
        this.pokemonCount = response.data.count;
        this.isLoaded = true;
      } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
        this.isLoaded = false;
      }
    },
  },
};
</script>