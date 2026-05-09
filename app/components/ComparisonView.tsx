'use client';

import { Pokemon } from '@/app/lib/pokeapi';
import { useDashboardStore } from '@/app/store/dashboard';
import { X } from 'lucide-react';
import Image from 'next/image';

export function ComparisonView() {
  const { compareList, removeFromCompare, clearCompare } = useDashboardStore();

  if (compareList.length === 0) {
    return null;
  }

  const stats = [
    'hp',
    'attack',
    'defense',
    'sp-atk',
    'sp-def',
    'speed',
  ];

  const getMaxStatValue = (statName: string) => {
    let max = 0;
    compareList.forEach((pokemon) => {
      const stat = pokemon.stats.find((s) => s.stat.name === statName);
      if (stat && stat.base_stat > max) {
        max = stat.base_stat;
      }
    });
    return max || 100;
  };

  const getStatValue = (pokemon: Pokemon, statName: string) => {
    const stat = pokemon.stats.find((s) => s.stat.name === statName);
    return stat?.base_stat || 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Comparison ({compareList.length}/3)
        </h2>
        <button
          onClick={clearCompare}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-4 font-bold text-gray-800">Stat</th>
              {compareList.map((pokemon) => (
                <th
                  key={pokemon.id}
                  className="text-center p-4 font-bold text-gray-800 relative"
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={
                        pokemon.sprites?.other?.['official-artwork']?.front_default ||
                        pokemon.sprites?.front_default
                      }
                      alt={pokemon.name}
                      width={80}
                      height={80}
                      className="object-contain mb-2"
                    />
                    <p className="capitalize font-semibold">{pokemon.name}</p>
                  </div>
                  <button
                    onClick={() => removeFromCompare(pokemon.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-700 capitalize">{stat}</td>
                {compareList.map((pokemon) => {
                  const value = getStatValue(pokemon, stat);
                  const maxValue = getMaxStatValue(stat);
                  const percentage = (value / maxValue) * 100;

                  return (
                    <td
                      key={pokemon.id}
                      className="p-4 text-center"
                    >
                      <div className="space-y-2">
                        <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-purple-500 h-full flex items-center justify-center text-white text-sm font-semibold transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          >
                            {percentage > 20 && value}
                          </div>
                        </div>
                        {percentage <= 20 && (
                          <p className="text-sm font-semibold text-gray-700">{value}</p>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
