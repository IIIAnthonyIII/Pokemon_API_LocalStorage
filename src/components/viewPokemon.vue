<template>
    <div>
        <div class="container">
            <div class="row align-items-center">
                <div v-for="(pokemon) in PokeResultAPI" :key="pokemon.name" class="col-3">
                    <CardPokemon :PokeResultData="pokemon"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardPokemon from './cardPokemon.vue'

export default {
    name: 'ViewPokemon',
    props:{
        PokeResultAPI:{
            type: Array,
            required: true,
        },
    },
    components:{
        CardPokemon,
    }
}
</script>