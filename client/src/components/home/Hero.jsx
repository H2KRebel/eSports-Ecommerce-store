import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-cyan">
          Level up your setup
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Pro gear for{' '}
          <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
            competitive gamers
          </span>
        </h1>
        <p className="mt-6 text-lg text-gray-400">
          Mice, keyboards, headsets, team jerseys, and collectibles — curated for
          Valorant, CS2, and League players.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>
          <Link to="/products" className="btn-secondary">
            Browse Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
