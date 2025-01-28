import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <AuthenticatedLayout header={<h2 className="">Dashboard</h2>}>
      <Head title="Dashboard" />

      <div className="">
        <div className="">
          <div className="">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-extrabold">
                Welcome to Poke Card Prices
              </h2>
              <h3 className="mb-12 text-lg font-bold">
                A place to track your Pokemon card collection and prices.
              </h3>
              <div className="rounded-lg border-4 border-sky-400 p-4">
                <p className="mb-2 text-lg font-bold">
                  We are currently in BETA.
                </p>
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
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
