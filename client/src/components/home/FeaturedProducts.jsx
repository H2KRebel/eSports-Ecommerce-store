import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import ProductGrid from '../products/ProductGrid';
import Spinner from '../ui/Spinner';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getProducts({ featured: true, limit: 4 });
        setProducts(res.data);
      } catch {
        setError('Could not load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Featured Gear
          </h2>
          <p className="mt-2 text-gray-400">Hand-picked pro favorites.</p>
        </div>
        <Link
          to="/products"
          className="hidden text-sm font-medium text-accent-cyan hover:underline sm:block"
        >
          View all →
        </Link>
      </div>

      <div className="mt-8">
        {loading && (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        )}
        {error && (
          <p className="rounded-xl border border-dark-border bg-dark-card p-8 text-center text-gray-400">
            {error}
          </p>
        )}
        {!loading && !error && <ProductGrid products={products} />}
      </div>
    </section>
  );
}
