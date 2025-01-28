import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
  auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <Guest>
      <Head title="Poke Card Prices" />
      <div className="mb-8">
        <h2 className="mb-4 text-3xl font-extrabold">
          Welcome to Poke Card Prices
        </h2>
        <h3 className="mb-12 text-lg font-bold">
          A place to track your Pokemon card collection and prices.
        </h3>
        <div className="rounded-lg border-4 border-sky-400 p-4">
          <p className="mb-2 text-lg font-bold">We are currently in BETA.</p>
          <p className="mb-6 text-lg font-bold">
            please report any issues you find on our{' '}
            <a
              className="font-bold text-sky-400 hover:text-sky-300"
              href="https://github.com/destinio/pokemoney"
            >
              GitHub
            </a>{' '}
            repository.
          </p>
        </div>
      </div>
      <nav className="flex justify-center gap-4 text-xl">
        <Link
          href={route('login')}
          className="rounded border-2 border-sky-700 px-4 py-2 font-bold text-white hover:bg-sky-700"
        >
          Log in
        </Link>
        <Link
          href={route('register')}
          className="rounded border-2 border-sky-700 px-4 py-2 font-bold text-white hover:bg-sky-700"
        >
          Register
        </Link>
      </nav>
    </Guest>
  );
}
