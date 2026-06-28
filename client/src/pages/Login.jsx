import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="page-title text-center">Login</h1>
      <p className="mt-2 text-center text-gray-400">Welcome back, gamer.</p>
      <LoginForm />
    </div>
  );
}
