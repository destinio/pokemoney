import { SetCard } from '@/Components/SetCard';
import { useSets } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Sets() {
  const { data: sets, isLoading, isFetching } = useSets();

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (!sets) {
    return (
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        No Sets
      </h2>
    );
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Sets
        </h2>
      }
    >
      <Head title="Sets" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">Sets</div>
            <div className="flex flex-wrap gap-4">
              {sets.map((s) => (
                <SetCard key={s.id} set={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
