import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-accent-cyan ${
    isActive ? 'text-accent-cyan' : 'text-gray-300'
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-dark-border bg-dark/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-lg font-bold tracking-wider text-white">
          e<span className="text-accent-cyan">Sports</span> Store
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart
            <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-cyan/20 px-1.5 text-xs font-semibold text-accent-cyan">
              0
            </span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-gray-300 transition-colors hover:text-white sm:block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-accent-cyan px-4 py-2 text-sm font-semibold text-dark transition-all hover:shadow-neon"
          >
            Sign Up
          </Link>

          <button
            type="button"
            className="rounded-lg border border-dark-border p-2 text-gray-300 md:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
