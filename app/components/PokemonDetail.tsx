'use client';

import { Pokemon } from '@/app/lib/pokeapi';
import { useDashboardStore } from '@/app/store/dashboard';
import { Heart, BarChart3, ChevronLeft, X } from 'lucide-react';
import Image from 'next/image';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onBack?: () => void;
  onClose?: () => void;
}

export function PokemonDetail({ pokemon, onBack, onClose }: PokemonDetailProps) {
  const { addFavorite, removeFavorite, isFavorite, addToCompare, removeFromCompare, isInCompare } =
    useDashboardStore();

  const favorited = isFavorite(pokemon.id);
  const inCompare = isInCompare(pokemon.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const toggleCompare = () => {
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
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div>
            <p className="text-sm opacity-90">Pokémon Details</p>
            <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg relative">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="text-gray-400 text-center">No image available</div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                ID
              </h3>
              <p className="text-2xl font-bold text-gray-800">#{pokemon.id}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
                Types
              </h3>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-2 rounded-full text-white font-semibold capitalize ${getTypeColor(
                      type.type.name
                    )}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">Height</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(pokemon.height / 10).toFixed(1)}m
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">Weight</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(pokemon.weight / 10).toFixed(1)}kg
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleFavorite}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                  favorited
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Heart size={20} fill={favorited ? 'currentColor' : 'none'} />
                {favorited ? 'Favorited' : 'Add to Favorites'}
              </button>

              <button
                onClick={toggleCompare}
                className={`py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                  inCompare
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BarChart3 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Abilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.ability.name}
                className="bg-blue-50 p-3 rounded-lg border border-blue-200"
              >
                <p className="font-semibold capitalize text-gray-800">
                  {ability.ability.name.replace(/-/g, ' ')}
                </p>
                {ability.is_hidden && (
                  <p className="text-xs text-blue-600 font-semibold">Hidden Ability</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Base Stats</h3>
          <div className="space-y-4">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold capitalize text-gray-700">
                    {stat.stat.name.replace(/-/g, ' ')}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-full transition-all duration-300"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
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
