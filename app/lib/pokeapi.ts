import axios from 'axios';

const API_BASE = 'https://pokeapi.co/api/v2';

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export const pokeAPI = {
  async getPokemonList(limit = 20, offset = 0) {
    const response = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  async getPokemonDetails(nameOrId: string | number) {
    const response = await axios.get(`${API_BASE}/pokemon/${nameOrId}`);
    return response.data as Pokemon;
  },

  async getPokemonsByType(type: string) {
    const response = await axios.get(`${API_BASE}/type/${type}`);
    return response.data;
  },

  async searchPokemon(query: string) {
    try {
      // First try exact match
      return await this.getPokemonDetails(query.toLowerCase());
    } catch {
      // If not found, get all pokemon and filter
      const list = await this.getPokemonList(1000, 0);
      const filtered = list.results.filter((p: PokemonListItem) =>
        p.name.includes(query.toLowerCase())
      );
      return filtered;
    }
  },

  async getAllTypes() {
    const response = await axios.get(`${API_BASE}/type`);
    return response.data.results;
  },
};
