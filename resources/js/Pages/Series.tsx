import { ISeries } from '@/all-types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Sets({ series }: PageProps<{ series: ISeries[] }>) {
  return (
    <AuthenticatedLayout header={<h2 className="">Series/Sets</h2>}>
      <Head title="Series" />

      <div className="">
        <h2>Series</h2>
        <div>
          {series
            .sort(
              (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date),
            )
            .map((series) => {
              return (
                <div key={series.id} className="flex gap-4">
                  <img
                    src={series.image_url}
                    alt={series.name}
                    className="h-20 w-20 object-cover"
                  />
                  <div>
                    <h3>{series.name}</h3>
                    <p>{series.release_date}</p>
                    <div>
                      {series.sets.map((set) => {
                        return (
                          <Link href={route('set.show', set.id)}>
                            <div key={set.id} className="flex gap-4">
                              <img
                                src={set.logo_url}
                                alt={set.name}
                                className="h-10 w-10 object-cover"
                              />
                              <div>
                                <h4>{set.name}</h4>
                                <p>{set.release_date}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
