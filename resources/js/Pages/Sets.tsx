import { Loading } from '@/Components/Loading';

import { useSets } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Sets() {
  const { data: series, isLoading, isFetching } = useSets();

  return (
    <AuthenticatedLayout header={<h2 className="">Series/Sets</h2>}>
      <Head title="Sets" />
      <h2 className="mb-6 text-lg font-bold">
        We are currently only supporting Scarlet & Violet
      </h2>

      <div className="">
        {isLoading || isFetching ? (
          <div className="mt-32 flex justify-center text-6xl">
            <Loading />
          </div>
        ) : null}

        {series
          ? series
              .filter((s) => s.name === 'Scarlet & Violet')
              .map((s) => {
                return (
                  <div key={s.name} className="flex flex-wrap gap-4">
                    {s.sets.map((set) => {
                      return (
                        <Link key={set.id} href={`/set/${set.id}`}>
                          <img
                            key={set.id}
                            src={set.images.logo}
                            className="h-16"
                          />
                        </Link>
                      );
                    })}
                  </div>
                );
              })
          : null}
      </div>
    </AuthenticatedLayout>
  );
}
