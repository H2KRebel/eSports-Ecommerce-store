const categories = [
  { value: '', label: 'All Categories' },
  { value: 'mouse', label: 'Mice' },
  { value: 'keyboard', label: 'Keyboards' },
  { value: 'headset', label: 'Headsets' },
  { value: 'jersey', label: 'Jerseys' },
  { value: 'collectible', label: 'Collectibles' },
];

const games = [
  { value: '', label: 'All Games' },
  { value: 'Valorant', label: 'Valorant' },
  { value: 'CS2', label: 'CS2' },
  { value: 'League of Legends', label: 'League of Legends' },
  { value: 'General', label: 'General' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ProductFilters({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value, page: '1' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value.trim();
    onChange({ ...filters, search, page: '1' });
  };

  return (
    <aside className="space-y-6 rounded-xl border border-dark-border bg-dark-card p-5">
      <h2 className="font-display text-lg font-semibold text-white">Filters</h2>

      <form onSubmit={handleSearch}>
        <label htmlFor="search" className="mb-1.5 block text-sm text-gray-400">
          Search
        </label>
        <div className="flex gap-2">
          <input
            id="search"
            name="search"
            type="text"
            defaultValue={filters.search}
            placeholder="Search gear..."
            className="input-field flex-1"
          />
          <button type="submit" className="btn-secondary px-3 text-sm">
            Go
          </button>
        </div>
      </form>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm text-gray-400">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="input-field"
        >
          {categories.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="game" className="mb-1.5 block text-sm text-gray-400">
          Game
        </label>
        <select
          id="game"
          name="game"
          value={filters.game}
          onChange={handleChange}
          className="input-field"
        >
          {games.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="minPrice" className="mb-1.5 block text-sm text-gray-400">
            Min $
          </label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="0"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1.5 block text-sm text-gray-400">
            Max $
          </label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="500"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1.5 block text-sm text-gray-400">
          Sort by
        </label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="input-field"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
