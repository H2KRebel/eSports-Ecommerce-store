import { useEffect, useState } from 'react';
import { getProductBySlug } from '../api/products';

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch {
        setError('Product not found.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}
