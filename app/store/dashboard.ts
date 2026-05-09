import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pokemon } from '@/app/lib/pokeapi';

interface DashboardStore {
  favorites: Pokemon[];
  compareList: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  addToCompare: (pokemon: Pokemon) => void;
  removeFromCompare: (pokemonId: number) => void;
  clearCompare: () => void;
  isInCompare: (pokemonId: number) => boolean;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      compareList: [],

      addFavorite: (pokemon: Pokemon) =>
        set((state) => ({
          favorites: state.isFavorite(pokemon.id)
            ? state.favorites
            : [...state.favorites, pokemon],
        })),

      removeFavorite: (pokemonId: number) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== pokemonId),
        })),

      isFavorite: (pokemonId: number) => {
        const { favorites } = get();
        return favorites.some((p) => p.id === pokemonId);
      },

      addToCompare: (pokemon: Pokemon) =>
        set((state) => ({
          compareList:
            state.compareList.length < 3 &&
            !state.isInCompare(pokemon.id)
              ? [...state.compareList, pokemon]
              : state.compareList,
        })),

      removeFromCompare: (pokemonId: number) =>
        set((state) => ({
          compareList: state.compareList.filter((p) => p.id !== pokemonId),
        })),

      clearCompare: () => set({ compareList: [] }),

      isInCompare: (pokemonId: number) => {
        const { compareList } = get();
        return compareList.some((p) => p.id === pokemonId);
      },
    }),
    {
      name: 'pokemon-dashboard-store',
    }
  )
);
