import { ICard } from '@/all-types';
import { Loading } from '@/Components/Loading';
import SaveModal from '@/Components/SaveModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/Components/ui/accordion';
import { Input } from '@/Components/ui/input';
import { useSet } from '@/hooks/useSets';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function NA() {
  return <span className="text-slate-700">N\A</span>;
}

export default function Cards({ id }: PageProps<{ id: string }>) {
  const { data, isLoading, isFetching } = useSet(id);

  const [cards, setCards] = useState<ICard[]>(null!);

  useEffect(() => {
    if (data) {
      setCards(data.sort((a, b) => Number(a.number) - Number(b.number)));
    }
  }, [data]);

  const searchRef = useRef<HTMLInputElement>(null!);

  function handleChangeSearch() {
    if (data) {
      const value = searchRef.current.value.replace(/^0+/, '').toLowerCase();

      console.log('number check', !!Number(value));

      if (!!Number(value)) {
        setCards(cards.filter((card) => card.number.includes(value)));
        return;
      } else {
        if (value.length <= 2) {
          setCards(data);
          return;
        }
        setCards(
          cards.filter((card) => card.name.toLowerCase().includes(value)),
        );
      }
    }
  }

  return (
    <AuthenticatedLayout>
      <Head title="Set" />
      <div className="">
        <header className="mb-8 flex justify-between">
          <div>
            <h2 className="text-3xl text-sky-300">
              {data ? data[0]?.set.name : 'Loading Set...'}
            </h2>
            <h3>{data ? data[0].set.series : ''}</h3>
          </div>
          {data ? <img className="h-12" src={data[0].set.images.logo} /> : null}
        </header>
        {isLoading || isFetching ? (
          <div className="mt-32 flex justify-center text-6xl">
            <Loading />
          </div>
        ) : null}
        {cards ? (
          <div className="flex flex-col gap-4">
            <div className="">
              <Input
                className="text-slate-900"
                placeholder="Search"
                onChange={handleChangeSearch}
                ref={searchRef}
              />
            </div>
            <Accordion
              style={{
                height: '500px',
              }}
              type="single"
              collapsible
              className="scrollbar-hidden overflow-y-auto"
            >
              {cards.map((c) => {
                return (
                  <AccordionItem value={c.id} key={c.id}>
                    <AccordionTrigger>
                      <div className="flex gap-2">
                        <div className="font-medium text-slate-400">
                          {String(c.number).padStart(3, '0')}
                        </div>
                        <div className="font-bold">{c.name}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex w-full justify-between">
                        <div>
                          <SaveModal card={c} />
                          <div>{c.rarity}</div>
                          <div>
                            {c.tcgplayer?.prices &&
                            'normal' in c.tcgplayer?.prices ? (
                              c.tcgplayer?.prices?.normal?.mid
                            ) : (
                              <NA />
                            )}
                          </div>
                          <div>
                            {c.tcgplayer?.prices &&
                            'holofoil' in c.tcgplayer?.prices ? (
                              c.tcgplayer?.prices?.holofoil?.mid
                            ) : (
                              <NA />
                            )}
                          </div>
                          <div>
                            {c.tcgplayer?.prices &&
                            'reverseHolofoil' in c.tcgplayer?.prices ? (
                              c.tcgplayer?.prices?.reverseHolofoil?.mid
                            ) : (
                              <NA />
                            )}
                          </div>
                          <div>
                            {c.tcgplayer?.prices &&
                            '1stEditionHolofoil' in c.tcgplayer?.prices ? (
                              c.tcgplayer?.prices?.['1stEditionHolofoil']?.mid
                            ) : (
                              <NA />
                            )}
                          </div>
                          <div>
                            {c.tcgplayer?.prices &&
                            '1stEditionNormal' in c.tcgplayer?.prices ? (
                              c.tcgplayer?.prices?.['1stEditionNormal']?.mid
                            ) : (
                              <NA />
                            )}
                          </div>
                        </div>
                        <img src={c.images.small} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        ) : null}
      </div>
    </AuthenticatedLayout>
  );
}
