import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-accent-cyan ${
    isActive ? 'text-accent-cyan' : 'text-gray-300'
  }`;

export default function Navbar() {
  const { user, logout, loading } = useAuth();

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
          {!loading && user ? (
            <>
              <span className="hidden text-sm text-gray-300 sm:block">
                Hi, <span className="text-accent-cyan">{user.name}</span>
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            !loading && (
              <>
                <Link
                  to="/login"
                  className="hidden text-sm font-medium text-gray-300 transition-colors hover:text-white sm:block"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-2 text-sm">
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
