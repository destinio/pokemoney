import { ICard } from '@/all-types';
import { CardInfo } from '@/Components/CardInfo';
import { Loading } from '@/Components/Loading';
import { Input } from '@/Components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

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
      <Head title="CArds" />
      <header className="mb-8 flex justify-between">
        <div>
          <h2 className="text-3xl text-sky-300">
            {data ? data[0]?.set.name : 'Loading Set...'}
          </h2>
          <h3>{data ? data[0].set.series : ''}</h3>
        </div>
        {data ? <img className="h-16" src={data[0].set.images.logo} /> : null}
      </header>
      {isLoading || isFetching ? (
        <div className="mt-32 flex justify-center text-6xl">
          <Loading />
        </div>
      ) : null}
      {data && currentCard && cardOpen ? (
        <CardInfo close={() => setCardOpen(false)} card={currentCard} />
      ) : null}
      {cards ? (
        <div className="flex flex-wrap gap-4 overflow-auto">
          <div>
            <Input
              className="text-slate-900"
              placeholder="Search"
              onChange={handleChangeSearch}
              ref={searchRef}
            />
          </div>
          <Table>
            <TableCaption>List of Set Cards</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rarity</TableHead>
                <TableHead>Normal</TableHead>
                <TableHead>Holofoil</TableHead>
                <TableHead>Reverse Holofoil</TableHead>
                <TableHead>1st Holofoil</TableHead>
                <TableHead>1st Normal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((c) => {
                return (
                  <TableRow onClick={() => handleSelect(c)} key={c.id}>
                    <TableCell className="font-medium">
                      {String(c.number).padStart(3, '0')}
                    </TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.rarity}</TableCell>

                    <TableCell>
                      {c.tcgplayer?.prices &&
                      'normal' in c.tcgplayer?.prices ? (
                        c.tcgplayer?.prices?.normal?.mid
                      ) : (
                        <NA />
                      )}
                    </TableCell>
                    <TableCell>
                      {c.tcgplayer?.prices &&
                      'holofoil' in c.tcgplayer?.prices ? (
                        c.tcgplayer?.prices?.holofoil?.mid
                      ) : (
                        <NA />
                      )}
                    </TableCell>
                    <TableCell>
                      {c.tcgplayer?.prices &&
                      'reverseHolofoil' in c.tcgplayer?.prices ? (
                        c.tcgplayer?.prices?.reverseHolofoil?.mid
                      ) : (
                        <NA />
                      )}
                    </TableCell>
                    <TableCell>
                      {c.tcgplayer?.prices &&
                      '1stEditionHolofoil' in c.tcgplayer?.prices ? (
                        c.tcgplayer?.prices?.['1stEditionHolofoil']?.mid
                      ) : (
                        <NA />
                      )}
                    </TableCell>
                    <TableCell>
                      {c.tcgplayer?.prices &&
                      '1stEditionNormal' in c.tcgplayer?.prices ? (
                        c.tcgplayer?.prices?.['1stEditionNormal']?.mid
                      ) : (
                        <NA />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </AuthenticatedLayout>
  );
}
