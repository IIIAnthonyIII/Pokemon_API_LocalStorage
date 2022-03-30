<template>
    <div v-if="state">
        <div>
            {{pokemonData.name}}
        </div>
        <div>
            <img :src="pokemonData.sprites.front_default" alt="pokemonImagen">
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardPokemon',
    props:{
        PokeResultData:{
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
        }
    },
    methods: {
        async getDataPokemonAPI(){
            await this.axios.get(this.PokeResultData.url).then(response => {
                this.pokemonData = response.data;
                this.state = true;
                //console.log(this.pokemonData.sprites.front_default);
            }).catch(error => {
                console.log(error);
            })
        }
    },
}
</script>