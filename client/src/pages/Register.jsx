import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="page-title text-center">Create Account</h1>
      <p className="mt-2 text-center text-gray-400">Join the store and track your orders.</p>
      <RegisterForm />
    </div>
  );
}
