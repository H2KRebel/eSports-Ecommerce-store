import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import Spinner from '../components/ui/Spinner';
import { useProducts } from '../hooks/useProducts';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || '',
    game: searchParams.get('game') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
    page: searchParams.get('page') || '1',
  };

  const { products, pagination, loading, error } = useProducts(filters);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.game) params.set('game', newFilters.game);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.sort && newFilters.sort !== 'newest') params.set('sort', newFilters.sort);
    if (newFilters.page && newFilters.page !== '1') params.set('page', newFilters.page);
    setSearchParams(params);
  };

  const goToPage = (page) => {
    updateFilters({ ...filters, page: String(page) });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="page-title">Products</h1>
      <p className="mt-2 text-gray-400">
        {pagination
          ? `${pagination.total} items in catalog`
          : 'Browse our full catalog of esports gear.'}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <ProductFilters filters={filters} onChange={updateFilters} />

        <div>
          {loading && (
            <div className="flex justify-center py-20">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && <ProductGrid products={products} />}

          {pagination && pagination.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => goToPage(pagination.page - 1)}
                className="btn-secondary disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-4 text-sm text-gray-400">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                type="button"
                disabled={pagination.page >= pagination.pages}
                onClick={() => goToPage(pagination.page + 1)}
                className="btn-secondary disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
