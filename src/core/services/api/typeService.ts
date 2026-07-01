import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default {
  getTypesByPagination (offset: number, limit: number) : Promise<any>{
    return axios.get(`${API_BASE_URL}/type?offset=${offset}&limit=${limit}`);
  }
}