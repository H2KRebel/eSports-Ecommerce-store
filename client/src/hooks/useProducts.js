import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';

export function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      const params = { page: filters.page, limit: 12, sort: filters.sort };
      if (filters.category) params.category = filters.category;
      if (filters.game) params.game = filters.game;
      if (filters.search) params.search = filters.search;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      try {
        const res = await getProducts(params);
        setProducts(res.data);
        setPagination(res.pagination);
      } catch {
        setError('Failed to load products.');
        setProducts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, pagination, loading, error };
}
