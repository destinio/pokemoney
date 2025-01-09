import { useSets } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Sets() {
  const { data: series, isLoading, isFetching } = useSets();

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (!series) {
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
          Series/Sets
        </h2>
      }
    >
      <Head title="Sets" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex flex-col gap-4 text-xl text-sky-200">
              {series.map((set) => {
                return (
                  <div>
                    <h2>{set.name}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
