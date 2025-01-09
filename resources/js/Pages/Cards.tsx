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
    return <h2 className="">No cards</h2>;
  }

  return (
    <AuthenticatedLayout header={<h2 className="">{cards[0].set.name}</h2>}>
      <Head title="" />

      <div className="">
        <div className="">
          <div className="">
            <div className="">Sets</div>
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
