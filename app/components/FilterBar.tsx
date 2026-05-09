'use client';

import { useEffect, useState } from 'react';
import { pokeAPI } from '@/app/lib/pokeapi';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (type: string | null) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typesData = await pokeAPI.getAllTypes();
        setTypes(typesData.map((t: { name: string }) => t.name));
      } catch (error) {
        console.error('Error loading types:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type);
    onFilterChange(type);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading types...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-600" />
        <h3 className="font-bold text-gray-800">Filter by Type</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleTypeSelect(null)}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            selectedType === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Types
        </button>

        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type)}
            className={`px-4 py-2 rounded-full font-semibold transition capitalize ${
              selectedType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
