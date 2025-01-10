import { ICard } from '@/all-types';
import { CardInfo } from '@/Components/CardInfo';
import { Loading } from '@/Components/Loading';
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

  const [currentCard, setCurrentCard] = useState<ICard>(null!);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setCards(data);
    }
  }, [data]);

  const searchRef = useRef<HTMLInputElement>(null!);

  function handleChangeSearch() {
    if (data) {
      const value = searchRef.current.value.replace(/^0+/, '').toLowerCase();

      console.log('number check', !!Number(value));

      if (!!Number(value)) {
        console.log('number search', value);
        setCards(cards.filter((card) => card.number.includes(value)));
        return;
      } else {
        if (value.length <= 2) {
          console.log('reset');
          setCards(data);
          return;
        }
        setCards(
          cards.filter((card) => card.name.toLowerCase().includes(value)),
        );
      }
    }
  }

  function handleSelect(c: ICard) {
    setCurrentCard(c);
    setCardOpen(true);
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
        {data && currentCard && cardOpen ? (
          <CardInfo close={() => setCardOpen(false)} card={currentCard} />
        ) : null}
      </div>
    </AuthenticatedLayout>
  );
}

/*
 *
            <Table>
              <TableCaption>List of Set Cards</TableCaption>
              <TableHeader>
                <AccordionItem>
                  <TableHead className="w-[100px]">Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Rarity</TableHead>
                  <TableHead>Normal</TableHead>
                  <TableHead>Holofoil</TableHead>
                  <TableHead>Reverse Holofoil</TableHead>
                  <TableHead>1st Holofoil</TableHead>
                  <TableHead>1st Normal</TableHead>
                </AccordionItem>
              </TableHeader>
 */
