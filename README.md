# Pokémon Dashboard

A modern, interactive Pokémon dashboard built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. Explore, search, filter, compare, and bookmark your favorite Pokémon using data from the [PokéAPI](https://pokeapi.co/).

## Features

✨ **Core Features:**
- 🔍 **Search Pokémon** - Search by name to quickly find Pokémon
- 🏷️ **Type-Based Filtering** - Filter Pokémon by their type (Fire, Water, Grass, Electric, etc.)
- 📊 **Detailed Information Cards** - View comprehensive details including stats, abilities, height, and weight
- ❤️ **Favorites System** - Save your favorite Pokémon (persisted to local storage)
- ⚖️ **Pokémon Comparison** - Compare up to 3 Pokémon side-by-side with visual stat comparisons
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Quick Start

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Tech Stack

- **Framework**: [Next.js 16.2](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **API**: [PokéAPI](https://pokeapi.co/) - Free Pokémon Data API

## Project Structure

```
pokemon-dashboard/
├── app/
│   ├── components/
│   │   ├── ComparisonView.tsx      # Side-by-side Pokémon comparison
│   │   ├── FilterBar.tsx           # Type-based filtering controls
│   │   ├── FavoritesList.tsx       # Favorites modal view
│   │   ├── PokemonCard.tsx         # Individual Pokémon card component
│   │   ├── PokemonDashboard.tsx    # Main dashboard container
│   │   ├── PokemonDetail.tsx       # Detailed Pokémon information modal
│   │   └── SearchBar.tsx           # Search input component
│   ├── lib/
│   │   └── pokeapi.ts             # PokéAPI service and types
│   ├── store/
│   │   └── dashboard.ts           # Zustand state management
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Features Explained

### 🔍 Search Pokémon
- Type a Pokémon name in the search box at the top
- Results filter in real-time as you type
- Combines with type filtering for precise results

### 🏷️ Filter by Type
- Click any type button (Fire, Water, Grass, Electric, etc.)
- Click "All Types" to reset the filter
- 18 different Pokémon types to choose from

### 📊 Detailed Information
- Click any Pokémon card to view full details
- See stats, abilities, dimensions, and more
- Stats displayed with visual progress bars

### ❤️ Favorites System
- Click the heart button to save your favorite Pokémon
- Access favorites from the header button
- Automatically persisted to browser local storage

### ⚖️ Compare Pokémon
- Add up to 3 Pokémon to the comparison view
- Compare stats side-by-side with visual bars
- Remove individual Pokémon or clear all

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Grid layout adapts from 1 to 4 columns
- Touch-friendly buttons and interactions

## How to Use

1. **Search**: Type a Pokémon name to filter results
2. **Filter**: Click a type button to show only that type
3. **View Details**: Click any card to see full information
4. **Save Favorites**: Click the heart button to bookmark
5. **Compare**: Click the chart button to add to comparison (up to 3)
6. **Load More**: Scroll down and click "Load More Pokémon" for additional data

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## API Integration

The dashboard uses the free **PokéAPI** to fetch Pokémon data:

### Endpoints Used:
- `GET /pokemon` - Paginated list of Pokémon
- `GET /pokemon/{id|name}` - Detailed Pokémon information
- `GET /type` - All Pokémon types
- `GET /type/{type}` - Pokémon by specific type

**No API key required!** PokéAPI is completely free and public.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Pokémon loaded in batches of 20
- Images cached by browser
- Favorites persisted to local storage
- Efficient filtering with real-time search

## Troubleshooting

**Pokémon not loading?**
- Check internet connection
- Ensure PokéAPI is accessible
- Try refreshing the page

**Search not working?**
- Wait for results to filter
- Check spelling of Pokémon name

**Favorites not saving?**
- Ensure browser allows local storage
- Not available in private/incognito mode

## Future Enhancements

- [ ] Evolution chain visualization
- [ ] Team builder with saving
- [ ] Dark mode toggle
- [ ] Filter by stat ranges
- [ ] Export team as image
- [ ] PWA support
- [ ] Advanced move details
- [ ] Multiplayer features

## Credits

- **PokéAPI**: https://pokeapi.co/ - Pokémon data source
- **Pokémon**: © 2023 The Pokémon Company International
- **Icons**: Lucide React
- **Framework**: Next.js and Vercel

---

**Enjoy exploring Pokémon! 🚀**
