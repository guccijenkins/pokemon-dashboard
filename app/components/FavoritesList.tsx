'use client';

import { useDashboardStore } from '@/app/store/dashboard';
import { Heart } from 'lucide-react';
import { PokemonCard } from './PokemonCard';
import { useState } from 'react';
import { PokemonDetail } from './PokemonDetail';
import { Pokemon } from '@/app/lib/pokeapi';

interface FavoritesListProps {
  onClose: () => void;
}

export function FavoritesList({ onClose }: FavoritesListProps) {
  const { favorites } = useDashboardStore();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  if (!selectedPokemon) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={28} fill="currentColor" />
              <h2 className="text-2xl font-bold text-gray-800">
                My Favorite Pokémon ({favorites.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="p-6">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 text-lg">
                  No favorites yet. Start adding your favorite Pokémon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((pokemon) => (
                  <div key={pokemon.id} onClick={() => setSelectedPokemon(pokemon)}>
                    <PokemonCard pokemon={pokemon} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <PokemonDetail
        pokemon={selectedPokemon}
        onBack={() => setSelectedPokemon(null)}
        onClose={onClose}
      />
    </div>
  );
}
