import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-dark-border bg-dark-card transition-all hover:border-accent-cyan/50 hover:shadow-neon"
    >
      <div className="relative aspect-square overflow-hidden bg-dark">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded bg-accent-purple px-2 py-0.5 text-xs font-bold uppercase text-white">
            Featured
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute right-3 top-3 rounded bg-red-500/90 px-2 py-0.5 text-xs font-bold text-white">
            Sold Out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-accent-cyan">
          {product.category}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-white group-hover:text-accent-cyan">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{product.brand}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.rating > 0 && (
            <span className="text-xs text-gray-400">★ {product.rating}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
