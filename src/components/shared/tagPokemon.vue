<template>
  <div class="flex gap-5 mt-sm font-serif">
    <template v-for="typeData in TypeResultData" :key="typeData.type.name">
      <span
        :style="{ backgroundColor: getTypeColor(typeData.type.name) }"
        class="px-2 py-1 rounded-full text-white text-xs uppercase tracking-wider"
      >
        {{ typeData.type.name }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: "TagPokemon",
  props: {
    TypeResultData: {
      type: Array as any,
    },
  },
  data() {
    return {
      typeColors: {
        normal: '#A8A878',
        fighting: '#C03028',
        flying: '#A890F0',
        poison: '#A040A0',
        ground: '#E0C068',
        rock: '#B8A038',
        bug: '#A8B820',
        ghost: '#705898',
        steel: '#B8B8D0',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        psychic: '#F85888',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        fairy: '#EE99AC',
        stellar: '#E0D4FF',
        unknown: '#68A090',
        shadow: '#2C1A3D',
      } as { [key: string]: string }
    };
  },
  methods:{
    getTypeColor(typeName: string): string {
      return this.typeColors[typeName.toLowerCase()] || '#A8A878';
    }
  }
}
</script>