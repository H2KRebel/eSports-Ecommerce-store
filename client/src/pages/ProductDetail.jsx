import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGallery from '../components/products/ProductGallery';
import Spinner from '../components/ui/Spinner';
import { useProduct } from '../hooks/useProduct';

const categoryLabels = {
  mouse: 'Mouse',
  keyboard: 'Keyboard',
  headset: 'Headset',
  jersey: 'Jersey',
  collectible: 'Collectible',
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="page-placeholder">
          <p className="text-lg font-semibold text-white">Product not found</p>
          <p className="mt-2 text-gray-400">
            This item may have been removed or the link is incorrect.
          </p>
          <Link to="/products" className="btn-primary mt-6 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const inStock = product.stock > 0;
  const maxQty = Math.min(product.stock, 10);

  const handleAddToCart = () => {
    // Wired to CartContext in Part 12
    console.log('Add to cart:', { productId: product._id, quantity });
  };

  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));
  const incrementQty = () => setQuantity((q) => Math.min(maxQty, q + 1));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400">
        <Link to="/" className="transition-colors hover:text-accent-cyan">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="transition-colors hover:text-accent-cyan">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-300">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-accent-cyan/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
              {categoryLabels[product.category] || product.category}
            </span>
            {product.featured && (
              <span className="rounded bg-accent-purple px-2 py-0.5 text-xs font-bold uppercase text-white">
                Featured
              </span>
            )}
            {!inStock && (
              <span className="rounded bg-red-500/90 px-2 py-0.5 text-xs font-bold uppercase text-white">
                Sold Out
              </span>
            )}
          </div>

          <h1 className="page-title mt-4">{product.name}</h1>
          <p className="mt-2 text-gray-400">{product.brand}</p>

          {product.rating > 0 && (
            <p className="mt-3 text-sm text-gray-300">
              <span className="text-accent-cyan">★</span> {product.rating}
              {product.reviewCount > 0 && (
                <span className="text-gray-500"> ({product.reviewCount} reviews)</span>
              )}
            </p>
          )}

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-gray-300">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-dark-border bg-dark-card p-4 text-sm">
            <div>
              <dt className="text-gray-500">Game</dt>
              <dd className="mt-1 font-medium text-white">{product.game}</dd>
            </div>
            {product.team && (
              <div>
                <dt className="text-gray-500">Team</dt>
                <dd className="mt-1 font-medium text-white">{product.team}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-500">Stock</dt>
              <dd className={`mt-1 font-medium ${inStock ? 'text-green-400' : 'text-red-400'}`}>
                {inStock ? `${product.stock} available` : 'Out of stock'}
              </dd>
            </div>
            {product.tags?.length > 0 && (
              <div className="col-span-2">
                <dt className="text-gray-500">Tags</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-dark-border px-2.5 py-0.5 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          {inStock && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg border border-dark-border">
                <button
                  type="button"
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="px-4 py-3 text-gray-300 transition-colors hover:text-white disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[3rem] text-center font-semibold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQty}
                  disabled={quantity >= maxQty}
                  className="px-4 py-3 text-gray-300 transition-colors hover:text-white disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-primary flex-1 sm:flex-none"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
