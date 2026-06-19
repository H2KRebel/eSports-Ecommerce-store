import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-dark-border bg-dark-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-display text-sm font-bold tracking-wider text-white">
              e<span className="text-accent-cyan">Sports</span> Store
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Pro gear. Team merch. Built for gamers.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/products" className="transition-colors hover:text-accent-cyan">
              Products
            </Link>
            <Link to="/cart" className="transition-colors hover:text-accent-cyan">
              Cart
            </Link>
            <Link to="/login" className="transition-colors hover:text-accent-cyan">
              Account
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} eSports Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
