import { Loading } from '@/Components/Loading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';

import { useSets } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Sets() {
  const { data: series, isLoading, isFetching } = useSets();

  if (isLoading || isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!series) {
    return <h2 className="">No Sets</h2>;
  }

  return (
    <AuthenticatedLayout header={<h2 className="">Series/Sets</h2>}>
      <Head title="Sets" />

      <div className="">
        <Accordion type="single" collapsible>
          {series.map((s, i) => {
            return (
              <AccordionItem key={s.name} value={`item-${i + 1}`}>
                <AccordionTrigger>{s.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-4">
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
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </AuthenticatedLayout>
  );
}
