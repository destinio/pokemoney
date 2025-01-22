import { ISet } from '@/all-types';
import SaveModal from '@/Components/SaveModal';
import { useSet } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function SetsShowPage({ set }: PageProps<{ set: ISet }>) {
  const { isLoading, isFetching, data } = useSet(set.id);

  const loading = isLoading || isFetching;

  return (
    <AuthenticatedLayout>
      <header className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{set.name}</h2>
        <img className="h-14" src={set.logo_url} alt={set.name} />
      </header>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {loading ? <h2>Loading cards...</h2> : null}
        {data?.map((card) => {
          return (
            <div key={card.id} className="">
              <img src={card.images.small} alt={card.name} />
              {!loading ? <SaveModal card={card} /> : null}
            </div>
          );
        })}
      </section>
    </AuthenticatedLayout>
  );
}
