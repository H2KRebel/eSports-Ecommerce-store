import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="page-title text-center">Create Account</h1>
      <p className="mt-2 text-center text-gray-400">Join the store and track your orders.</p>

      <div className="page-placeholder mt-8">
        <p className="text-sm uppercase tracking-widest text-accent-purple">Coming in Part 8</p>
        <p className="mt-2">Registration form will go here.</p>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-cyan hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
