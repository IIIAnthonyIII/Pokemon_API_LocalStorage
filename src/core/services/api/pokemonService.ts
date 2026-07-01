import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default {
  getPokemonsByPagination (offset: number, limit: number) : Promise<any>{
    return axios.get(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  },
  getDataPokemon (url: string) : Promise<any>{
    return axios.get(url);
  }
}