'use client';

import { Pokemon } from '@/app/lib/pokeapi';
import { useDashboardStore } from '@/app/store/dashboard';
import { Heart, BarChart3 } from 'lucide-react';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect?: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const { addFavorite, removeFavorite, isFavorite, addToCompare, removeFromCompare, isInCompare } =
    useDashboardStore();

  const favorited = isFavorite(pokemon.id);
  const inCompare = isInCompare(pokemon.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const toggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(pokemon.id);
    } else {
      addToCompare(pokemon);
    }
  };

  const imageUrl =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div
      onClick={() => onSelect?.(pokemon)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-400"
    >
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 flex justify-center items-center h-48 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold capitalize text-gray-800">
          {pokemon.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">#{pokemon.id}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`text-xs px-2 py-1 rounded-full text-white font-semibold capitalize ${
                getTypeColor(type.type.name)
              }`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">Height</p>
            <p className="font-semibold">{(pokemon.height / 10).toFixed(1)}m</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-600">Weight</p>
            <p className="font-semibold">{(pokemon.weight / 10).toFixed(1)}kg</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleFavorite}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              favorited
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />
            {favorited ? 'Favorited' : 'Favorite'}
          </button>

          <button
            onClick={toggleCompare}
            className={`py-2 px-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              inCompare
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BarChart3 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-gray-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    ice: 'bg-cyan-400',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-blue-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-600',
    rock: 'bg-gray-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-blue-700',
    dark: 'bg-gray-900',
    steel: 'bg-gray-600',
    fairy: 'bg-pink-400',
  };
  return colors[type] || 'bg-gray-500';
}
