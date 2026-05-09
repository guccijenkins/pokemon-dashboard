'use client';

import { useState, useEffect, useMemo } from 'react';
import { pokeAPI, Pokemon } from '@/app/lib/pokeapi';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { PokemonCard } from './PokemonCard';
import { ComparisonView } from './ComparisonView';
import { FavoritesList } from './FavoritesList';
import { PokemonDetail } from './PokemonDetail';
import { useDashboardStore } from '@/app/store/dashboard';
import { Heart, Loader } from 'lucide-react';

export function PokemonDashboard() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [offset, setOffset] = useState(0);
  const { compareList, favorites } = useDashboardStore();

  const POKEMON_PER_PAGE = 20;

  // Load initial Pokémon list
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await pokeAPI.getPokemonList(POKEMON_PER_PAGE, offset);

        const pokemonDetails = await Promise.all(
          data.results.map((p: { name: string }) =>
            pokeAPI.getPokemonDetails(p.name)
          )
        );

        setPokemonList((prev) =>
          offset === 0 ? pokemonDetails : [...prev, ...pokemonDetails]
        );
      } catch (error) {
        console.error('Error loading Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [offset]);

  // Filter Pokémon based on search and type
  const filtered = useMemo(() => {
    let filtered = pokemonList;

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }

    return filtered;
  }, [searchQuery, selectedType, pokemonList]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + POKEMON_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold">Pokémon Dashboard</h1>
              <p className="text-blue-100">Explore and compare Pokémon from the PokéAPI</p>
            </div>
            <button
              onClick={() => setShowFavorites(true)}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition"
            >
              <Heart size={20} fill="currentColor" />
              Favorites ({favorites.length})
            </button>
          </div>

          <SearchBar onSearch={setSearchQuery} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter and Comparison Section */}
        <div className="mb-8">
          <FilterBar onFilterChange={setSelectedType} />
        </div>

        {compareList.length > 0 && <ComparisonView />}

        {/* Pokémon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filtered.length > 0 ? (
            filtered.map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => setSelectedPokemon(pokemon)}
                className="cursor-pointer"
              >
                <PokemonCard pokemon={pokemon} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No Pokémon found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!searchQuery && !selectedType && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition flex items-center gap-2"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? 'Loading...' : 'Load More Pokémon'}
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        </div>
      )}

      {showFavorites && <FavoritesList onClose={() => setShowFavorites(false)} />}
    </div>
  );
}
