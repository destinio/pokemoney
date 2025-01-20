import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
  auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <div className="m-auto max-w-screen-md text-white">
      <Head title="Welcome" />
      <div className="pt-32 text-white">
        <h1 className="mb-4 text-4xl">Poke TCG Prices</h1>
        <nav className="flex gap-4 text-xl">
          {auth.user ? (
            <Link href={route('dashboard')} className="">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href={route('login')} className="">
                Log in
              </Link>
              <Link href={route('register')} className="">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
