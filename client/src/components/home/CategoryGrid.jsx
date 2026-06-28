import { Link } from 'react-router-dom';

const categories = [
  { slug: 'mouse', label: 'Mice', icon: '🖱️', desc: 'Precision aim tools' },
  { slug: 'keyboard', label: 'Keyboards', icon: '⌨️', desc: 'Rapid trigger & mechanical' },
  { slug: 'headset', label: 'Headsets', icon: '🎧', desc: 'Hear every footstep' },
  { slug: 'jersey', label: 'Jerseys', icon: '👕', desc: 'Rep your favorite team' },
  { slug: 'collectible', label: 'Collectibles', icon: '🏆', desc: 'Figures & memorabilia' },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
        Shop by Category
      </h2>
      <p className="mt-2 text-gray-400">Find the right gear for your grind.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            className="group rounded-xl border border-dark-border bg-dark-card p-5 transition-all hover:border-accent-cyan/50 hover:shadow-neon"
          >
            <span className="text-3xl">{cat.icon}</span>
            <h3 className="mt-3 font-semibold text-white group-hover:text-accent-cyan">
              {cat.label}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
