import { useSet } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Cards({ id }: PageProps<{ id: string }>) {
  const { data: cards, isLoading, isFetching } = useSet(id);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (!cards) {
    return (
      <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        No cards
      </h2>
    );
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {cards[0].set.name}
        </h2>
      }
    >
      <Head title="Sets" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">Sets</div>
            <div className="flex flex-wrap gap-4">
              {cards.map((c) => {
                return (
                  <div>
                    <div>
                      <img src={`${c.images.small}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <pre className="p-2 text-sky-200">
            {JSON.stringify(cards[0], null, 2)}
          </pre>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
